#!/usr/bin/env bash
#
# Gaegu 폰트를 페이지에 실제로 쓰인 글자만 남기고 서브셋 → woff2 로 변환한다.
# 한글 전체를 담은 원본 TTF는 3MB에 가까워서 그대로 쓸 수 없다.
#
# 선행 조건:
#   - dist/index.html 이 존재해야 한다 (npm run build 를 먼저 실행)
#   - pyftsubset (fonttools) + brotli 설치:  pip3 install --user fonttools brotli
#
# 사용법:  npm run build && npm run fonts
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT/public/fonts"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

if [[ ! -f "$ROOT/dist/index.html" ]]; then
  echo "error: dist/index.html 이 없습니다. 먼저 'npm run build' 를 실행하세요." >&2
  exit 1
fi

export PATH="$HOME/Library/Python/3.9/bin:$HOME/.local/bin:$PATH"
if ! command -v pyftsubset >/dev/null 2>&1; then
  echo "error: pyftsubset 을 찾을 수 없습니다.  pip3 install --user fonttools brotli" >&2
  exit 1
fi

echo "==> 빌드된 HTML에서 사용 문자 추출"
# 태그/스크립트/스타일을 제거하고 남은 텍스트 노드만 모은다.
python3 - "$ROOT/dist/index.html" "$WORK/content.txt" <<'PY'
import html, re, sys

src, dst = sys.argv[1], sys.argv[2]
raw = open(src, encoding='utf-8').read()
raw = re.sub(r'<(script|style)\b.*?</\1>', ' ', raw, flags=re.S | re.I)
text = html.unescape(re.sub(r'<[^>]+>', ' ', raw))

chars = {c for c in text if c.strip()}
# 연도 표기 등 나중에 바뀔 수 있는 숫자/기호는 항상 포함시킨다.
chars |= set('0123456789 .,:;~^()[]-–—\'"“”‘’/%&@!?#*+=<>©')
open(dst, 'w', encoding='utf-8').write(''.join(sorted(chars)))
print(f'    {len(chars)}자')
PY

echo "==> 원본 TTF 다운로드"
BASE="https://raw.githubusercontent.com/google/fonts/main/ofl/gaegu"
for f in Gaegu-Light Gaegu-Regular Gaegu-Bold; do
  curl -sfL -o "$WORK/$f.ttf" "$BASE/$f.ttf"
done
curl -sfL -o "$OUT_DIR/OFL.txt" "$BASE/OFL.txt"

echo "==> 서브셋 + woff2 변환"
mkdir -p "$OUT_DIR"
for f in Gaegu-Light Gaegu-Regular Gaegu-Bold; do
  pyftsubset "$WORK/$f.ttf" \
    --text-file="$WORK/content.txt" \
    --output-file="$OUT_DIR/$f.woff2" \
    --flavor=woff2 \
    --layout-features='*' \
    --notdef-glyph --notdef-outline --recommended-glyphs
  printf '    %-16s %s\n' "$f.woff2" "$(du -h "$OUT_DIR/$f.woff2" | cut -f1)"
done

echo "==> 완료. 총 $(du -ch "$OUT_DIR"/*.woff2 | tail -1 | cut -f1)"
