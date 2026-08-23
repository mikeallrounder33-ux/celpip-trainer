# Pointing a domain at this site

Hosting stays free on GitHub Pages. A domain is ~$12–15/year and optional —
the site already works at the github.io address.

## Recommended name

**clbtrainer.ca** — checked as unregistered (no DNS delegation, Aug 2026).
"CLB" is the Canadian Language Benchmarks scale this app reports against: a
federal framework, not a Paragon trademark. Brand first, test named only as a
description, which is the safe nominative-fair-use pattern.

Runners-up, also unregistered at time of checking:
`clbtrainer.ca` · `honestmarking.com` · `plainband.com` · `bandhonest.com`
· `clbdrill.com` · `clbbands.com` · `benchbound.ca` · `clbprep.ca`

Availability was checked by DNS delegation, which is indicative, not
authoritative. Confirm at the registrar before paying.

Do NOT register anything containing "celpip". It is a registered trademark of
Paragon Testing Enterprises, and a domain built on it is the single largest
legal risk this project could take on — especially once any money is involved.

## Free alternatives (no purchase at all)

| Option | Address | Notes |
|---|---|---|
| GitHub Pages | `mikeallrounder33-ux.github.io/celpip-trainer/` | already live |
| Cloudflare Pages | `<name>.pages.dev` | free, connect the repo |
| Netlify | `<name>.netlify.app` | free, connect the repo |
| js.org | `<name>.js.org` | free subdomain for JS projects, by pull request |

## Steps once you own the domain

1. At the registrar, add these records:

       A     @     185.199.108.153
       A     @     185.199.109.153
       A     @     185.199.110.153
       A     @     185.199.111.153
       CNAME www   mikeallrounder33-ux.github.io

2. GitHub repo → Settings → Pages → Custom domain → enter it → Save.
   Wait for the DNS check to pass, then tick **Enforce HTTPS**.
   Do not create the CNAME file manually before you own the domain — it breaks
   the github.io address.

3. Update the hard-coded URLs, then rebuild and push:

       cd celpip-trainer
       grep -rl 'mikeallrounder33-ux.github.io/celpip-trainer' \
         celpip-src index.html sitemap.xml robots.txt worker \
         | xargs sed -i '' 's#https://mikeallrounder33-ux.github.io/celpip-trainer#https://clbtrainer.ca#g'
       sh celpip-src/build.sh
       git add -A && git commit -m "Point everything at the custom domain" && git push

4. Google Search Console and Bing Webmaster Tools: add the domain, verify by
   DNS, submit `/sitemap.xml`.

## Keep your email out of future commits

    git config user.email "<your-id>@users.noreply.github.com"

Enable it first at GitHub → Settings → Emails → "Keep my email address
private". Existing commits keep the old address unless history is rewritten.
