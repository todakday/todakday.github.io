# 토닥하루 소개 페이지

인천 송도동 영유아 가정 방문 돌봄 서비스 **토닥하루**의 소개 페이지 (1페이지 정적 사이트).

- 배포 주소: https://todakday.github.io
- 원본 전단지: [`docs/leaflet.png`](docs/leaflet.png)
- 제작 계획·설계 문서: [`docs/PLAN.md`](docs/PLAN.md)

## 개발

Node **22 이상**이 필요하다 (`.node-version` 참고).

```bash
npm install
npm run dev        # http://localhost:4321
```

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | `dist/`로 정적 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npx astro check` | 타입·문법 검사 |
| `npm run fonts` | 폰트 서브셋 재생성 (아래 참고) |
| `npm run og` | OG 미리보기 이미지 재생성 (아래 참고) |

## 문구 수정하기

페이지의 모든 텍스트는 [`src/data/service.ts`](src/data/service.ts) 한 곳에 있다.
이 파일만 고치면 페이지 전체에 반영된다.

문구를 고친 뒤에는 **폰트 서브셋을 다시 만들어야 한다.** 폰트에 페이지에서 실제로
쓰는 글자만 담아 두었기 때문에, 새로 추가한 글자가 서브셋에 없으면 폴백 서체로
표시된다.

```bash
npm run build && npm run fonts
```

`pyftsubset`이 필요하다:

```bash
pip3 install --user fonttools brotli
```

## OG 미리보기 이미지 재생성

카카오톡·슬랙 등에서 링크를 공유할 때 보이는 이미지(`public/og-image.jpg`)는
**실제 렌더된 페이지를 스크린샷**해서 만든다. 디자인이나 문구를 바꿨으면 다시 굽는다.

```bash
npm run build
npx astro preview --port 4321 &   # 다른 터미널에서 실행해도 된다
npm run og
```

## 카카오톡 채널 연결

현재 카카오톡 버튼은 채널 URL이 없어 비활성 상태다.
[`src/data/service.ts`](src/data/service.ts)의 `contact.kakaoHref`에 URL을 넣으면
Hero와 모바일 하단 CTA 두 버튼이 자동으로 활성화된다.

```ts
export const contact = {
  // ...
  kakaoHref: 'https://pf.kakao.com/_XXXXX',
};
```

## 배포

`main`에 push하면 GitHub Actions가 빌드해서 GitHub Pages로 배포한다
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

> **최초 1회 설정 필요**: 저장소 Settings → Pages → Source를 **GitHub Actions**로
> 지정해야 한다. 이 설정 전에는 워크플로가 성공해도 사이트가 갱신되지 않는다.

## 스택

- [Astro](https://astro.build) 7 (정적 출력, 클라이언트 JS 0바이트)
- 폰트: [Gaegu](https://fonts.google.com/specimen/Gaegu) (SIL OFL 1.1, `public/fonts/OFL.txt`)
- UI 라이브러리 없음 — CSS 커스텀 프로퍼티 + Astro 스코프 스타일
