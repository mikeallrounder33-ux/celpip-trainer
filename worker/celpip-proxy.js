/**
 * CELPIP Trainer — key-hiding proxy (Cloudflare Worker)
 *
 * Lets the browser use a paid model without ever holding the API key.
 * The key lives as a Worker secret; the page only knows this worker's URL.
 *
 * Deploy (free tier is enough):
 *   npm create cloudflare@latest celpip-proxy -- --type hello-world
 *   # replace src/index.js with this file
 *   npx wrangler secret put UPSTREAM_KEY      # paste your OpenAI or Anthropic key
 *   npx wrangler deploy
 *
 * Then in the app: Settings → OpenAI-compatible
 *   Base URL = https://celpip-proxy.<your-subdomain>.workers.dev/v1
 *   tick "This endpoint needs no key from the browser"
 *
 * Set ALLOWED_ORIGIN to your own site so other people cannot spend your credit.
 */

const ALLOWED_ORIGIN = 'https://mikeallrounder33-ux.github.io'; // or '*' while testing
const UPSTREAM = 'https://api.openai.com/v1/chat/completions';

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN === '*' ? (origin || '*') : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization',
    'Access-Control-Max-Age': '86400'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) });
    }
    if (request.method !== 'POST') {
      return new Response('POST only', { status: 405, headers: cors(origin) });
    }
    if (ALLOWED_ORIGIN !== '*' && origin && origin !== ALLOWED_ORIGIN) {
      return new Response('Origin not allowed', { status: 403, headers: cors(origin) });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: { message: 'Invalid JSON body' } }),
        { status: 400, headers: { ...cors(origin), 'content-type': 'application/json' } });
    }

    // Cap spend per request. Adjust to taste.
    if (body.max_tokens && body.max_tokens > 4000) body.max_tokens = 4000;

    const upstream = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + env.UPSTREAM_KEY
      },
      body: JSON.stringify(body)
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: { ...cors(origin), 'content-type': 'application/json' }
    });
  }
};
