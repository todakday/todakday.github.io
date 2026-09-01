# 토닥하루 소개 페이지 제작 계획

- 작성일: 2026-08-31 (구현 완료: 2026-09-01)
- 원본: `docs/leaflet.png` (전단지 1장)
- 산출물: Astro 기반 정적 1페이지, GitHub Pages 배포 (`https://todakday.github.io`)

> **상태: 구현 완료.** 이 문서는 최초 계획서이며, 구현 과정에서 확정·변경된 사항은
> 각 절에 반영했다. 실제 결과 요약과 남은 작업은 [8절](#8-구현-결과)을 참고.

---

## 1. 서비스 파악

**토닥하루** — 영유아 대상 **가정 방문 돌봄 서비스**.

유아특수교사 14년 경력의 개인 교사가 운영하는 1인 방문 돌봄 서비스다. 인천 송도동
및 인근 지역을 대상으로, 보호자가 잠깐의 외출·휴식이 필요할 때 또는 갑작스러운 질병
등으로 육아 도움이 필요할 때 교사가 가정으로 직접 방문해 1:1 돌봄을 제공한다.

일반 시터 서비스와 구분되는 지점은 **특수교육 전문성**이다. 낮가림이 심한 영유아,
발달이 느린 영유아, 장애영유아를 명시적 대상으로 포함하고 있어, 기존 돌봄 서비스가
받아주기 어려웠던 아이들이 핵심 타깃이다.

| 항목 | 내용 |
|---|---|
| 타깃 고객 | 송도동/인근 거주, 생후 3개월 이상 영유아 보호자 |
| 차별점 | 유아특수교사 자격 + 14년 경력, 발달·장애 영유아 수용 |
| 전환 목표 | 전화(010-8050-0969) 또는 카카오톡(`todakharu`) 문의 |
| 톤 | 따뜻함, 손글씨 느낌, 안심시키는 어조 |

페이지의 성공 지표는 체류시간이 아니라 **문의 전환** 하나다. 따라서 전화·카카오톡
CTA를 상단·하단·플로팅 3곳에 배치한다.

---

## 2. 전단지 콘텐츠 전문 추출

아래는 **전단지 원문 그대로**의 추출 결과다. 실제 페이지에는 운영자 승인을 받아
맞춤법을 교정한 버전이 들어간다 ([7절](#7-운영자-확인-결과) 교정 표 참조).
콘텐츠는 `src/data/service.ts`에 단일 원본으로 관리한다.

### 헤더
- 타이틀: **토닥하루** (`토닥` 주황 / `하루` 초록, 옆에 웃는 네잎클로버)
- 배지(노란 알약): `영유아 대상 방문 돌봄 서비스`

### 리드 문구
> 잠깐의 외출이나 휴식이 필요하거나, 갑작스러운 질병 등으로 인해 육아에 도움이 필요할때
> **전문 교사가 가정**으로 **방문**하여 **돌봄**을 제공합니다.

강조 색: `전문 교사가 가정` 주황, `방문` 초록, `돌봄` 주황

### 정보 카드 6개 (3열 × 2행)

**① 돌봄 대상**
- 생후 3개월 이상 영유아
- 낮가림이 심한 영유아
- 발달이 느린 영유아
- 장애영유아

**② 돌봄 방법**
- 가정 방문 돌봄
- 1:1 돌봄 (보호자가 함께 있을 경우 2:2 돌봄 가능)
- 놀이 중심의 정서 맞춤 돌봄

**③ 돌봄 교사**
- 유아특수교사 14년 경력
  - *(유아특수교사, 보육교사 자격 보유)* — 분홍색 작은 글씨
- 영아돌봄 경험 有
- 송도동 거주

**④ 이용 시간**
- 평일 9:00 ~ 16:00
- 2시간 이상 예약 가능
- 이 외 시간은 문의주세요.

**⑤ 이용 요금 및 지역**
- 시간 당 **20,000원** — 금액은 붉은색 강조
- 송도동 전지역
- 송도동 인근 가능

**⑥ 문의 방법**
- 010-8050-0969
- 카카오톡 **todakharu**
- 돌봄 중에는 답변이 느릴 수 있습니다.

### 마무리 문구 (노란 형광펜 배경)
> 아이를 키우다 보면 누구나 '나를 토닥여줄 누군가'가 간절한 순간이 있습니다.
> 엄마의 마음으로, 교사의 눈으로 따듯함과 전문성을 함께 담았습니다.
> 언제든 편안하게 문의주세요^^

### 하단 띠 (초록 배경)
> 토닥토닥, 아이도 편안하고 부모도 안심하는 시간 **토닥하루**

> 위 내용은 전단지 원문이다. `필요할때`, `따듯함`, `시간 당`, `전지역`, `문의주세요`,
> `장애영유아`, `영아돌봄` 7건은 운영자 승인 후 표준 표기로 교정해 반영했다.

---

## 3. 디자인 시스템 (전단지 느낌 재현)

### 3.1 컬러 토큰

최종값은 `docs/leaflet.png`의 실제 픽셀을 추출한 뒤 WCAG 대비를 맞춰 보정한 결과다
(구현 확정치, `src/styles/global.css`):

| 토큰 | 값 | 용도 | 크림 배경 대비 |
|---|---|---|---|
| `--cream` | `#FDF6E3` | 페이지 배경 | — |
| `--brand-orange` | `#D9631A` | 타이틀 `토닥` (로고타입) | 3.39 |
| `--brand-green` | `#6F9A3F` | 타이틀 `하루` (로고타입) | 3.06 |
| `--orange` | `#B84F10` | 본문 강조 | 4.68 |
| `--orange-btn` | `#EA7830` | CTA 버튼 배경 | 잉크 4.50 |
| `--green-deep` | `#4A6B26` | 카드 제목·강조 | 5.69 |
| `--red` | `#C23F2E` | 카드 제목·요금 강조 | 4.81 |
| `--pink` | `#B23F5A` | 자격 보유 부기 | 5.19 |
| `--green-band` | `#B6D091` | 하단 띠 배경 | — |
| `--orange-on-band` | `#8A3B10` | 띠 위 `토닥` | 띠 4.58 |
| `--green-on-band` | `#3F5A20` | 띠 위 `하루` | 띠 4.61 |
| `--ink-on-band` | `#2E4030` | 띠 위 본문 | 띠 6.56 |
| `--pill` | `#F0CF5A` | 섹션 제목 알약 배경 | — |
| `--highlight` | `#F3E08A` | 마무리 문구 형광펜 | 잉크 9.86 |
| `--line` | `#7FA64F` | 카드 구분선 | — |
| `--ink` | `#3A2F1F` | 본문 텍스트 | 12.12 |

**로고타입 예외**: `--brand-*` 두 색은 Hero의 대형 타이틀에만 쓴다. WCAG 1.4.3은
로고·상표 텍스트를 대비 요건에서 제외하므로, 브랜드 아이덴티티를 지키기 위해
전단지 원본 색을 그대로 살렸다. 기능적 텍스트에는 보정된 어두운 토큰을 쓴다.

**CTA 버튼**: 밝은 주황 배경에 흰 글자를 올리면 2.9:1까지 떨어져 배경을 갈색에
가깝게 어둡게 해야 했다. 전단지 느낌이 죽으므로 반대로 **밝은 주황 배경 + 어두운
잉크 글자** 조합으로 바꿨다 — 원본 색(`#E8722A`)에 거의 그대로 두면서 4.5:1을 만족.

### 3.2 타이포그래피

전단지 손글씨 느낌이 스타일의 핵심이다. **Gaegu**(Google Fonts, 300/400/700)를
기본 서체로 사용한다 — 둥글고 두툼한 손글씨 계열로 원본과 가장 가깝고, 웨이트가
3종이라 타이틀/제목/본문 위계를 낼 수 있다.

- 타이틀 `토닥하루`: Gaegu 700, `clamp(2.1rem, 12vw, 5.5rem)`
  (320px에서 클로버와 한 줄에 들어가도록 하한을 3rem → 2.1rem으로 낮췄다)
- 카드 제목: Gaegu 700, 1.35rem
- 본문/리스트: Gaegu 400, 1.1rem (손글씨 서체는 작으면 가독성이 떨어지므로 기본보다 키움)
- 폴백: `'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`

폰트는 `woff2` 셀프 호스팅(`public/fonts/`) + `font-display: swap`으로 로드해
외부 요청과 CLS를 줄인다.

**서브셋 방식**: Google Fonts의 `unicode-range` 분할 CSS를 그대로 쓰면 한글 조각
파일이 수십 개로 쪼개져 요청이 늘어난다. 대신 원본 TTF(웨이트당 약 3MB)를 받아
**페이지에 실제로 쓰인 글자만** 남기고 웨이트별 단일 woff2로 굽는다.

`scripts/build-fonts.sh` (`npm run fonts`)가 이 과정을 자동화한다 — 빌드된
`dist/index.html`에서 텍스트를 추출해 문자 집합을 만들고 `pyftsubset`으로 서브셋한다.
빌드 산출물을 입력으로 쓰기 때문에 문구를 고쳐도 글리프가 누락될 일이 없다.

결과: 3웨이트 합계 **140KB** (Light 52KB / Regular 36KB / Bold 52KB, 210자).

> 문구를 수정하면 `npm run build && npm run fonts`를 다시 돌려야 한다.
> `pyftsubset`이 필요하다: `pip3 install --user fonttools brotli`

### 3.3 전단지 질감 재현 포인트

CSS만으로 손그림 느낌을 낸다. 이미지 슬라이스는 사용하지 않는다(반응형·접근성 손해).

1. **알약형 제목** — `border-radius: 999px` + 양 끝 흰 점 2개(`<span class="dot">`)
   → 원본의 구름 모양 라벨 재현
2. **구분선** — 카드 사이 초록 세로선/가로선.
   `linear-gradient` 방식은 `::before`/`::after`를 브레이크포인트마다 껐다 켜야 해서
   규칙이 얽혔다. **`border-right`/`border-bottom` + `nth-child`로 단순화**했고,
   결과가 원본과 동일하면서 반응형 재정의가 훨씬 짧다.
3. **형광펜 하이라이트** — `<mark>` + `linear-gradient(transparent 58%, var(--highlight) 58%)`,
   `box-decoration-break: clone`으로 줄바꿈 시에도 끝이 잘리지 않게 처리
4. **네잎클로버 마스코트** — `src/components/Clover.astro`에 인라인 SVG로 제작.
   베지어 꽃잎 4장을 90°씩 회전 + 웃는 얼굴 + 해칭 무늬로 손그림 느낌을 냈다.
   좌우 4° 흔들림 애니메이션, `prefers-reduced-motion`에서 정지.
   파비콘(`public/favicon.svg`)은 같은 도형에서 줄기·해칭을 뺀 단순화 버전.
5. **불릿** — `list-style: none` + 초록 원형 `<span class="marker">`

### 3.4 레이아웃

원본이 3열 그리드이므로 데스크톱은 그대로 3열, 태블릿 2열, 모바일 1열로 접는다.
모바일에서는 세로 스크롤 1열이 오히려 전단지를 위에서 아래로 읽는 흐름과 맞다.

```
데스크톱 (>= 900px)        모바일 (< 640px)
┌────┬────┬────┐          ┌────┐
│ 대상│방법│교사│          │ 대상│
├────┼────┼────┤          ├────┤
│ 시간│요금│문의│          │ 방법│
└────┴────┴────┘          │ ... │
```

- 컨테이너 최대폭 `1040px` (원본 전단지 비율에 근접)
- 카드 그리드: 고정 열 수 + 미디어쿼리 (`auto-fit`은 열 수가 유동적이라
  `nth-child` 기반 구분선 규칙과 맞지 않아 3 → 2 → 1 고정 방식으로 확정)
- 브레이크포인트: `> 900px` 3열 / `641–900px` 2열 / `≤ 640px` 1열
- 모바일 플로팅 CTA: 하단 고정 바 (전화 / 카카오톡 2버튼), `≤ 640px`에서만 표시.
  가려짐 방지로 하단 띠에 `padding-bottom: 5.5rem` + `env(safe-area-inset-bottom)`

---

## 4. 기술 구성

### 4.1 스택

- **Astro 7.2.9** (정적 출력) — 컴포넌트 단위 관리 + JS 0바이트 출력
- `@astrojs/sitemap` — `sitemap-index.xml` 자동 생성
- 프레임워크 UI 라이브러리 없음, CSS는 Astro 스코프 스타일 + 전역 토큰
- OG 이미지는 **렌더된 페이지를 직접 스크린샷**해서 만든다
  (`scripts/build-og-image.mjs`, `npm run og`).
  전단지 원본을 크롭하면 ① 교정 전 문구가 그대로 남고 ② 사이트가 바뀌어도 이미지가
  따라가지 않는다. Playwright로 1200×630 뷰포트를 2x로 찍어 JPEG로 굽는 방식이
  항상 실제 사이트와 일치한다. PNG 573KB → **JPEG 132KB**로 용량도 줄었다.

> **Astro 버전**: 계획 단계에서 5.x를 적었으나, 5.1.1에는 XSS·SSRF 관련 high 등급
> 권고가 다수 있어(`GHSA-j687-52p2-xcff` 등) 최신 **7.2.9**로 올렸다.
> `npm audit` 결과 0 vulnerabilities.

> **Node 버전 주의**: mise 기본값이 Node 18.20.2인데 Astro는
> `^18.20.8 || ^20.3.0 || >=22.0.0`을 요구한다. 로컬에 설치된 **Node 22.23.2**를
> `.node-version`으로 고정했고, CI도 `node-version-file: .node-version`로 같은 값을 읽는다.
> 로컬에서는 `mise exec node@22 -- npm ...` 또는 `mise use node@22`로 실행한다.

### 4.2 파일 구조

실제 구현 결과:

```
/
├── astro.config.mjs
├── package.json                 # scripts: dev/build/preview/fonts
├── tsconfig.json
├── .node-version                # 22
├── .gitignore
├── .github/workflows/deploy.yml
├── README.md
├── scripts/
│   ├── build-fonts.sh           # 폰트 서브셋 생성 (npm run fonts)
│   └── build-og-image.mjs       # OG 이미지 생성 (npm run og)
├── docs/
│   ├── leaflet.png              # 원본 전단지
│   └── PLAN.md                  # 이 문서
├── public/
│   ├── favicon.svg              # 클로버 파비콘
│   ├── clover.svg               # 마스코트 (단독 사용 대비)
│   ├── og-image.jpg             # 1200×630, 렌더된 페이지 스크린샷
│   ├── robots.txt
│   └── fonts/
│       ├── Gaegu-Light.woff2    # 52KB
│       ├── Gaegu-Regular.woff2  # 36KB
│       ├── Gaegu-Bold.woff2     # 52KB
│       └── OFL.txt              # 폰트 라이선스 (SIL OFL 1.1)
└── src/
    ├── data/service.ts          # 전단지 콘텐츠 단일 원본
    ├── styles/global.css        # @font-face, 컬러/타이포 토큰, 리셋
    ├── layouts/Base.astro       # <head>, 메타, OG, JSON-LD, 폰트 프리로드
    ├── components/
    │   ├── Hero.astro           # 타이틀 + 클로버 + 배지 + 리드 + CTA
    │   ├── Clover.astro         # 네잎클로버 인라인 SVG
    │   ├── PillHeading.astro    # 알약형 섹션 제목
    │   ├── InfoCard.astro       # 카드 1개 (제목 + 불릿 리스트)
    │   ├── InfoGrid.astro       # 카드 6개 + 구분선
    │   ├── Closing.astro        # 형광펜 마무리 문구
    │   ├── FooterBand.astro     # 초록 하단 띠
    │   └── FloatingCta.astro    # 모바일 고정 CTA
    └── pages/index.astro
```

### 4.3 콘텐츠 데이터 모델

전단지 텍스트를 `src/data/service.ts`에 타입 있는 상수로 두고 컴포넌트가 읽게 한다.
문구 수정 요청이 오면 이 파일 한 곳만 고치면 된다.

```ts
type Accent = 'orange' | 'green' | 'red' | 'pink';

interface Bullet {
  text: string;
  highlight?: string;        // text 안 일부만 강조 (예: "20,000원")
  highlightAccent?: Accent;
  note?: string;            // 불릿 아래 작은 보조 설명
  noteAccent?: Accent;
}

interface InfoCard {
  id: string;
  title: string;
  titleAccent?: Accent;
  bullets: Bullet[];
}
```

`highlight`는 부분 문자열 매칭으로 색을 입히므로, 문구를 고칠 때 `highlight` 값도
같이 맞춰야 한다 (매칭 실패 시 강조 없이 평문으로 출력되어 조용히 넘어간다).

### 4.4 배포

GitHub Actions로 빌드 후 Pages 배포 (`.github/workflows/deploy.yml`).

- `astro.config.mjs`: `site: 'https://todakday.github.io'`, `base` 불필요
  (user/org 사이트라 루트 경로에 배포됨)
- 트리거: `main` push + `workflow_dispatch`
- 잡 구성: `build` (checkout → setup-node → `npm ci` → `astro check` → `npm run build`
  → `upload-pages-artifact`) → `deploy` (`deploy-pages`)
- `withastro/action` 대신 표준 액션을 직접 조합했다. `astro check`를 배포 전
  게이트로 넣고 Node 버전을 `.node-version`과 한 곳에서 맞추기 위해서다.
- `permissions: pages: write, id-token: write`, `concurrency: pages`
- 폰트는 커밋된 정적 파일이라 CI에 `pyftsubset`이 필요 없다
  (`npm run fonts`는 문구를 고칠 때 로컬에서만 실행)

> **선행 작업 (수동)**: 저장소 Settings → Pages → Source를 **GitHub Actions**로
> 설정해야 한다. `docs/` 디렉터리가 있어 "Deploy from a branch /docs" 모드와
> 혼동될 수 있으니 반드시 확인할 것.

---

## 5. SEO / 접근성 / 성능

**SEO**
- `<title>` — `토닥하루 | 송도동 영유아 방문 돌봄 서비스`
- `description` — 리드 문구 요약, 지역명(송도동) 포함
- `og:image` — 렌더된 페이지의 1200×630 스크린샷 + `og:image:width/height/alt`,
  `og:site_name`, `og:locale` (일부 SNS는 width/height가 없으면 미리보기를 지연 렌더한다)
- JSON-LD `LocalBusiness`(`ChildCare`) — 서비스명, 전화번호, 영업시간, 서비스 지역, 요금
- `hreflang`/`lang="ko"`, `robots.txt`, `sitemap.xml`(`@astrojs/sitemap`)

**접근성**
- 전화번호 `<a href="tel:01080500969">` (Hero + 플로팅 CTA 2곳)
- 카카오톡은 채널 URL 미정이라 **비활성 상태**로 표기.
  `service.ts`의 `contact.kakaoHref`에 값을 넣으면 자동으로 링크로 바뀐다.
  비활성 표시에 `opacity`를 쓰면 대비가 깨지므로 색상 자체를 차분한 톤으로 교체
- 손글씨 서체 가독성 보완: 본문 17px, 자간 `0.01em`, 행간 1.7
- **색상 대비 WCAG AA 충족** — 전단지 색을 그대로 쓰면 주황 2.83, 분홍 3.77 등으로
  미달이라 기능적 텍스트용 색을 모두 어둡게 보정했다 (3.1절 표 참조).
  로고타입(Hero 타이틀)만 1.4.3 예외를 적용해 원본 색 유지
- 장식용 클로버 SVG는 `aria-hidden="true"`, `focusable="false"`
- 카드 제목은 `<h2>`(6개), 페이지 타이틀은 `<h1>` 단일
- `prefers-reduced-motion`에서 클로버 애니메이션과 모든 트랜지션 정지

**성능**
- JS **0바이트** (검증: 페이지 내 `<script>` 0개, JSON-LD 제외)
- 폰트 서브셋 합계 **140KB** (목표 200KB 이하 달성)
- 이미지 없는 CSS 기반 장식이므로 LCP는 타이틀 텍스트
- Bold/Regular 웨이트는 `<link rel="preload">`로 선반영

---

## 6. 작업 순서

| 단계 | 내용 | 상태 |
|---|---|---|
| 1 | Node 22 고정, Astro 프로젝트 초기화 | 완료 |
| 2 | Gaegu 폰트 서브셋 → `public/fonts/`, `global.css` 토큰 정의 | 완료 |
| 3 | `service.ts`에 전단지 텍스트 전량 입력 | 완료 |
| 4 | `Base.astro` + `Hero.astro` (타이틀·클로버·배지·리드) | 완료 |
| 5 | `PillHeading` / `InfoCard` / `InfoGrid` — 카드 6개 + 구분선 | 완료 |
| 6 | `Closing` (형광펜) + `FooterBand` (초록 띠) | 완료 |
| 7 | 반응형 3→2→1열, 모바일 플로팅 CTA | 완료 |
| 8 | SEO 메타 + JSON-LD + OG 이미지 + sitemap + robots.txt | 완료 |
| 9 | `.github/workflows/deploy.yml` 작성 | 완료 |
| 10 | 원본 전단지와 비교 검수 (320/375/390/768/1024/1440px) | 완료 |
| 11 | 저장소 Pages Source를 GitHub Actions로 변경 | **운영자 수동 작업** |
| 12 | 실제 배포 후 Lighthouse 측정 | 배포 후 |

---

## 7. 운영자 확인 결과

| 항목 | 결정 |
|---|---|
| 1. 카카오톡 채널 URL | 카카오톡 **계정**이라 채널 링크는 나중에 연결. 현재 ID만 비활성 표기 |
| 2. 맞춤법 | **모두 수정** (아래 목록) |
| 3. 전화번호 공개 | **미정(TBD)** — 우선 평문 + `tel:` 링크로 노출 |
| 4. 지역 표기 | `송도동 전 지역 및 인근`으로 통합 표기 |
| 5. 커스텀 도메인 | 계획 없음 (`CNAME` 불필요) |
| 6. 예약 폼 | 추후 결정 |

### 적용한 맞춤법 교정

| 원본 | 수정 | 근거 |
|---|---|---|
| 필요할때 | 필요할 때 | `때`는 의존명사 |
| 따듯함 | 따뜻함 | `따뜻하다`가 표준어 |
| 시간 당 | 시간당 | `-당`은 접미사 |
| 송도동 전지역 | 송도동 전 지역 | `전(全)`은 관형사 |
| 문의주세요 (2곳) | 문의해 주세요 | `문의주다`는 비문 |
| 장애영유아 | 장애 영유아 | 사전 미등재 합성어 |
| 영아돌봄 | 영아 돌봄 | 위와 일관성 |

---

## 8. 구현 결과

### 검증 완료

- `astro check` — 0 errors / 0 warnings / 0 hints
- `npm audit` — 0 vulnerabilities
- 헤드리스 Chromium 렌더 검증 — 콘솔 에러 0, 실패 요청 0, 스크립트 0개
- 가로 오버플로 없음 — 320 / 375 / 390 / 768 / 1024 / 1440px 전부 `scrollWidth == viewport`
- 교정 문구 7건 모두 페이지에 반영, 교정 전 표기 잔존 0건
- Gaegu 폰트 실제 적용 확인 (폴백 아님, 3웨이트 로드), 누락 글리프 없음
- 시맨틱 구조 — `h1` 1개, `h2` 6개, `lang="ko"`, JSON-LD `ChildCare`

### 남은 작업

1. **저장소 Pages Source 변경** — Settings → Pages → Source를 GitHub Actions로.
   이 설정 전에는 배포 워크플로가 성공해도 사이트가 갱신되지 않는다.
2. **첫 배포 후 확인** — OG 이미지가 절대 URL로 로드되는지, 카카오톡/슬랙 등에서
   링크 미리보기가 정상인지
3. **카카오톡 채널 연결** — `src/data/service.ts`의 `contact.kakaoHref`에 URL 입력.
   Hero와 플로팅 CTA 두 버튼이 자동으로 활성화된다
4. **전화번호 노출 방식 확정** — 평문 유지 여부 결정 (3번 항목 TBD)
5. **Lighthouse 측정** — 배포 URL 기준
