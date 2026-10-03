GRIMMOR DESIGNERS HUB — DEPLOY NOTES

Static website. No build step, no server code, no database.

1. Upload this whole folder as the site root. index.html is the home page.
2. Keep the folder structure exactly as it is:

   index.html                   Home (Designers Hub)
   02 Logo Guidelines.html
   03 Logo in Motion.html
   04 Opening Film.html
   05 Design Guidelines.html
   uploads/                     4 film clips (.mp4), used by index.html and 04 Opening Film.html
   assets/lottie/               2 Lottie JSON files (download links)
   assets/svg/                  4 SVG files (download links)

3. Do not rename files. File names contain spaces; links already use %20 encoding.
4. Fonts, images, scripts and styles are embedded inside each HTML file. Nothing loads from a CDN.
5. The host must serve .mp4 as video/mp4, .json as application/json, .svg as image/svg+xml (default on Netlify, Vercel, GitHub Pages, Cloudflare Pages).
