// Regenerates the downloadable PDF guides from content/guides/*.html.
// Requires `npm install -D playwright` first (not a project dependency).
// Run with: node scripts/generate-guides.js
const { chromium } = require('playwright');
const path = require('path');

const root = path.resolve(__dirname, '..');
const locales = ['es', 'ca', 'en'];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const locale of locales) {
    const page = await browser.newPage();
    const srcPath = path.resolve(root, `content/guides/guia-${locale}.html`);
    await page.goto(`file://${srcPath}`, { waitUntil: 'networkidle' });
    const outPath = path.resolve(root, `public/guides/muscle-keeper-guia-${locale}.pdf`);
    await page.pdf({
      path: outPath,
      format: 'A4',
      printBackground: true,
    });
    console.log('Generated', outPath);
    await page.close();
  }
  await browser.close();
})();
