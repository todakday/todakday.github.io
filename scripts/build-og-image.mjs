// OG 이미지(1200×630)를 실제 렌더된 페이지에서 생성한다.
// 전단지 원본을 크롭하면 교정 전 문구가 남고 사이트와 어긋나므로, 페이지를 직접 찍는다.
//
// 사용법:
//   npm run build
//   npx astro preview --port 4321 &
//   node scripts/build-og-image.mjs
//
// playwright가 필요하다: npm i -D playwright && npx playwright install chromium

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const pageUrl = process.env.OG_URL ?? 'http://localhost:4321';
const publicDir = new URL('../public/', import.meta.url);
const outPath = new URL('og-image.jpg', publicDir).pathname;

await mkdir(publicDir.pathname, { recursive: true });

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2, // 2x로 찍어 축소 → 글자 경계가 깔끔해진다
});

await page.goto(pageUrl, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// 모바일 전용 요소는 이 뷰포트에서 숨겨지지만, 혹시 모를 경우를 대비해 제거
await page.evaluate(() => {
  document.querySelector('.floating-cta')?.remove();
});

await page.screenshot({ path: outPath, type: 'jpeg', quality: 88, fullPage: false });
await browser.close();

console.log(`og-image.jpg 생성 완료 → ${outPath}`);
