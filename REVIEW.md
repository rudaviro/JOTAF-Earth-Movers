# JOTAF review checklist — November 2026

The website remains a standalone static Netlify deployment. This branch does not change DNS, Netlify project settings, or the NextTap server.

## What this branch delivers

- A dedicated `services.html` page for confirmed service categories: excavation, equipment hire and tipper haulage. No specific machine inventory or completed jobs are claimed.
- Deep links from that page to the home request form with the correct service selected.
- The original request form retains a WhatsApp handoff, but now attempts a Netlify Forms submission first and displays a visible status.
- A Netlify spam honeypot and required consent checkbox.
- A privacy notice and automated static checks for script syntax and local links.

## Before merging or deploying

1. Review wording, company details and the privacy notice with JOTAF. Replace stock photographs with licensed, authentic JOTAF equipment photographs if available.
2. Confirm this repository is connected to the intended existing Netlify site for `jotafearthmovers.site`; avoid accidentally creating a second site.
3. Enable or verify Netlify Forms in that site and publish the updated branch to a **non-production preview**.
4. Submit a synthetic enquiry through the preview and confirm it appears in Netlify > Forms. Verify the honeypot, consent, service preselection and WhatsApp message on a real phone.
5. Test desktop and small mobile screens, keyboard navigation and all contact links. Do not merge until form capture is verified.
6. Decide who may access enquiries, the retention/deletion process, and how JOTAF will be notified during business hours.
7. Only after approval, merge and deploy to the existing site; confirm the custom domain is correctly mapped.

## NextTap integration — still required

The Netlify form inbox is an **interim capture** mechanism, not the NextTap business dashboard. Do **not** describe the two systems as synced.

To show requests in NextTap, implement an authenticated, tenant-bound server-to-server delivery path with a verified signature/token, replay/idempotency protection, rate limits, field validation, delivery retries, and a separate source tag. Do not send any tenant API secret to public browser JavaScript.

Onboard JOTAF as a real approved NextTap business, set its verified external website URL to `https://jotafearthmovers.site`, assign scoped staff access, and test the full request/NFC route with a dedicated staging NextTap domain. The existing NFC platform has not been deployed from this branch.

## Safety

Website requests are unconfirmed leads, not reserved jobs or payments. Existing live JOTAF site and Tillo infrastructure must remain untouched until deployment is separately approved.
