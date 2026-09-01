// 전단지(docs/leaflet.png) 텍스트의 단일 원본.
// 문구를 고칠 때는 이 파일만 수정하면 페이지 전체에 반영된다.
//
// 원본 전단지 대비 맞춤법을 교정했다 (운영자 승인 완료):
//   필요할때 → 필요할 때 / 따듯함 → 따뜻함 / 시간 당 → 시간당
//   전지역 → 전 지역 / 문의주세요 → 문의해 주세요
//   장애영유아 → 장애 영유아 / 영아돌봄 → 영아 돌봄
//
// 문구를 수정한 뒤에는 폰트 서브셋을 다시 만들어야 한다:
//   npm run build && npm run fonts

export type Accent = 'orange' | 'green' | 'red' | 'pink';

export interface Bullet {
  text: string;
  /** text 안에서 강조색으로 표시할 부분 문자열 (예: "20,000원") */
  highlight?: string;
  highlightAccent?: Accent;
  /** 불릿 아래 작은 보조 설명 (예: 자격 보유 안내) */
  note?: string;
  noteAccent?: Accent;
}

export interface InfoCard {
  id: string;
  title: string;
  titleAccent?: Accent;
  bullets: Bullet[];
}

export const brand = {
  name: '토닥하루',
  nameParts: [
    { text: '토닥', color: 'orange' as const },
    { text: '하루', color: 'green' as const },
  ],
  badge: '영유아 대상 방문 돌봄 서비스',
};

export const lead = {
  // 강조 구간은 accent 키로 표시하고, 컴포넌트에서 색을 입힌다.
  segments: [
    { text: '잠깐의 외출이나 휴식이 필요하거나, 갑작스러운 질병 등으로 인해\n육아에 도움이 필요할 때 ' },
    { text: '전문 교사가 가정', accent: 'orange' as const },
    { text: '으로 ' },
    { text: '방문', accent: 'green' as const },
    { text: '하여 ' },
    { text: '돌봄', accent: 'orange' as const },
    { text: '을 제공합니다.' },
  ],
};

export const cards: InfoCard[] = [
  {
    id: 'target',
    title: '돌봄 대상',
    titleAccent: 'green',
    bullets: [
      { text: '생후 3개월 이상 영유아' },
      { text: '낮가림이 심한 영유아' },
      { text: '발달이 느린 영유아' },
      { text: '장애 영유아' },
    ],
  },
  {
    id: 'method',
    title: '돌봄 방법',
    titleAccent: 'red',
    bullets: [
      { text: '가정 방문 돌봄' },
      { text: '1:1 돌봄 (보호자가 함께 있을 경우 2:2 돌봄 가능)' },
      { text: '놀이 중심의 정서 맞춤 돌봄' },
    ],
  },
  {
    id: 'teacher',
    title: '돌봄 교사',
    bullets: [
      {
        text: '유아특수교사 14년 경력',
        note: '(유아특수교사, 보육교사 자격 보유)',
        noteAccent: 'pink',
      },
      { text: '영아 돌봄 경험 有' },
      { text: '송도동 거주' },
    ],
  },
  {
    id: 'hours',
    title: '이용 시간',
    titleAccent: 'red',
    bullets: [
      { text: '평일 9:00 ~ 16:00' },
      { text: '2시간 이상 예약 가능' },
      { text: '이 외 시간은 문의해 주세요.' },
    ],
  },
  {
    id: 'price',
    title: '이용 요금 및 지역',
    titleAccent: 'red',
    bullets: [
      { text: '시간당 20,000원', highlight: '20,000원', highlightAccent: 'red' },
      { text: '송도동 전 지역 및 인근' },
    ],
  },
  {
    id: 'contact',
    title: '문의 방법',
    titleAccent: 'red',
    bullets: [
      { text: '010-8050-0969' },
      { text: '카카오톡 todakharu' },
      { text: '돌봄 중에는 답변이 느릴 수 있습니다.' },
    ],
  },
];

export const closing = {
  lines: [
    "아이를 키우다 보면 누구나 '나를 토닥여줄 누군가'가 간절한 순간이 있습니다.",
    '엄마의 마음으로, 교사의 눈으로 따뜻함과 전문성을 함께 담았습니다.',
    '언제든 편안하게 문의해 주세요^^',
  ],
};

export const footerBand = {
  before: '토닥토닥, 아이도 편안하고 부모도 안심하는 시간 ',
  brand: '토닥하루',
};

export const contact = {
  phone: '010-8050-0969',
  phoneHref: 'tel:01080500969',
  kakaoId: 'todakharu',
  // 카카오톡 채널 링크는 아직 없음 — 연결 준비되면 이 값을 채운다.
  kakaoHref: undefined as string | undefined,
};
