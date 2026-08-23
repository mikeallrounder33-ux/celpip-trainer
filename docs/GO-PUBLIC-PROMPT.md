# The "go public" prompt

Paste this into Claude Code from the project folder to run the whole
publication pass. Everything here is executable except the two steps marked
MANUAL, which require a payment method or an account action only you can take.

---

Take the CELPIP trainer from an unbranded GitHub project to a publishable
public website. Do all of the following, verifying each step rather than
assuming it worked:

1. NAME. Propose brand names that do NOT contain the CELPIP trademark, and
   check which matching domains are actually unregistered (.com, .ca, .app,
   .org). Recommend one, with the runners-up and why. Also list the genuinely
   free subdomain options so a domain purchase is optional.

2. REBRAND. Replace the user-facing "CELPIP Trainer" brand with the chosen
   name across the app, landing page, README, LICENSE and metadata. Keep
   "practice for the CELPIP-General test" as a plain description underneath,
   which is nominative fair use. Do not rename the GitHub repository yet —
   that breaks the live URL before a domain exists to replace it.

3. PRIVACY WORDING. The footer claims nothing is sent anywhere. Make it
   precise: nothing is sent to us, but loading the in-browser model fetches
   weights from a CDN, and a user's own API key sends their responses to that
   provider. State both.

4. DOMAIN PREP. Put the DNS records, the GitHub Pages steps and the exact
   find-and-replace for every hard-coded URL into a single document, so
   pointing a domain at it later is one short job.

5. FUNDING. Add a single unobtrusive donation link (GitHub Sponsors) to the
   footer of both the app and the landing page. No ads, no trackers, no
   analytics — those would falsify the privacy claim, which is the most
   valuable thing the project owns.

6. VERIFY. Rebuild, run a regression over every module, confirm zero console
   errors, push, wait for the deploy and check the live site actually serves
   the changes.

MANUAL — I cannot do these for you:
  * Buy the domain (payment details)
  * Enable GitHub Sponsors (account action)
  * Switch your git email to the GitHub noreply address (account setting)
