# Approval log

## AL-0001 — Grimmor Designers Hub initial publication

- **Status:** Approved
- **Approved by:** ayhamalani-blip (`@ayhamalani-blip`)
- **Approved on:** 2026-10-03
- **Scope:** Publish the supplied Grimmor Designers Hub static package as a public GitHub Pages site, preserve the original assets and pages, and create the v1.0 release backup.
- **Exclusions:** Content redesigns, custom domains, and post-launch interaction changes.
- **Design or product notes:** The supplied static package remains the source of truth.
- **Implementation PR:** Published directly on `main` before repository governance was established.
- **Validation:** GitHub Pages build; resource, download, and film playback checks.

## AL-0002 — Focused Q&A views and resource return navigation

- **Status:** Approved
- **Approved by:** ayhamalani-blip (`@ayhamalani-blip`)
- **Approved on:** 2026-10-03
- **Scope:** Make the seven non-logo Start Here Q&A links open only their related Design Guidelines section; retain the Logo Guidelines destination for “Where does the logo go?”; add an always-visible “Back to Homepage” control to all four resource pages and focused guideline views.
- **Exclusions:** Changes to the guideline wording, visual redesign, resource names, asset files, custom domain, or release tag.
- **Design or product notes:** Reuse existing Grimmor editorial styling; focused sections must render from the existing Design Guidelines content rather than duplicated copies.
- **Implementation PR:** #1 — browser flows and GitHub Actions verification passed on 2026-10-03; approved for merge to `main`.
- **Validation:** All seven Q&A destinations map to their expected focused section; the logo Q&A remains on Logo Guidelines; Logo Guidelines, Logo in Motion, Opening Film, full Design Guidelines, and focused guideline views expose a working Back to Homepage action.

## AL-0003 — Social Media Design Guidelines chapter

- **Status:** Approved
- **Approved by:** ayhamalani-blip (`@ayhamalani-blip`)
- **Approved on:** 2026-10-27
- **Scope:** Add the supplied Grimmor Social Media Design Guidelines as a public fifth resource on the Designers Hub. Publish the complete 19-section chapter with its required local fonts, imagery, SVGs, and runtime dependencies; add a Back to Homepage action.
- **Exclusions:** Changes to the supplied chapter’s editorial content, platform guidance claims, imagery direction, developer-file catalogue, existing resource pages, custom domain, release tag, or repository visibility.
- **Design or product notes:** Use the supplied Claude artifact as the publishing source; retain the Grimmor white, ink, and restrained vermilion document treatment. Remove third-party artifact branding from the public Hub page.
- **Implementation PR:** #3 — browser flows and GitHub Actions verification passed on 2026-10-27; approved for merge to `main`.
- **Validation:** Verify the new Resources item opens the chapter; the chapter exposes all 19 numbered sections and Back to Homepage; every local image, SVG, font, and runtime file resolves; existing static-site checks pass.

## AL-0004 — Refresh Social Media Design Guidelines

- **Status:** Approved
- **Approved by:** ayhamalani-blip (`@ayhamalani-blip`)
- **Approved on:** 2026-10-27
- **Scope:** Replace the published Social Media Design Guidelines chapter and its dependency package with the current version at the user-provided Claude artifact URL. Retain the existing fifth Resources item, public chapter path, and Back to Homepage behavior.
- **Exclusions:** Changes to the chapter URL or resource-card wording; changes to other Hub pages, Q&A destinations, developer-file catalogue, custom domain, release tag, or repository visibility.
- **Design or product notes:** Publish the complete latest artifact package as local static assets, retain the Grimmor editorial document treatment, and remove third-party artifact branding from the public page.
- **Implementation PR:** #4 — browser flows and GitHub Actions verification passed on 2026-10-27; approved for merge to `main`.
- **Validation:** Verify all 19 sections and contents links; confirm every current local image, SVG, font, and runtime asset resolves; verify local fonts, Back to Homepage, static checks, GitHub Actions, and live Pages deployment.
