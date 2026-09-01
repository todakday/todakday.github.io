// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// user/org 페이지라 루트 경로에 배포된다. base 설정 불필요.
export default defineConfig({
  site: 'https://todakday.github.io',
  integrations: [sitemap()],
  build: {
    // GitHub Pages는 /path -> /path/index.html 을 그대로 서빙한다.
    format: 'directory',
  },
});
