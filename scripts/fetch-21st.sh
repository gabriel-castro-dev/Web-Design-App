#!/usr/bin/env bash
# Downloads raw assets of 21st.dev components for reconstruction.
# Usage: scripts/fetch-21st.sh <out-dir> <url> [<url> ...]
#   url: https://21st.dev/@<author>/components/<slug>
# Output per component: <out-dir>/<author>--<slug>/{page.html,bundle.html,demo.tsx,preview.*,preview.mp4,deps.txt,desc.txt}
# The component source itself lives in a private bucket; rebuild it from bundle.html.
set -u
out="$1"; shift
mkdir -p "$out"

for url in "$@"; do
  author=$(echo "$url" | sed -E 's#.*/@([^/]+)/components/.*#\1#')
  slug=$(echo "$url" | sed -E 's#.*/components/([^/?]+).*#\1#')
  d="$out/$author--$slug"
  (
    mkdir -p "$d"
    curl -sL -A 'Mozilla/5.0' -o "$d/page.html" "https://21st.dev/@$author/components/$slug"
    # stop at '?' so cache-busters like preview.png?v=1 still match the $-anchored patterns below
    all=$(grep -oE 'https://cdn\.21st\.dev/[^"\\ ?]*' "$d/page.html" | grep -v cdn-cgi | grep -v '/assets/' | sort -u)
    # URL layouts vary between components (timestamped, uuid-suffixed, user_<id>/..., bundled/<n>.html)
    pick() { echo "$all" | grep -E "$1" | grep -v -- '-dark' | head -1; }
    b=$(pick '/default/bundle[^/]*\.html$');           [ -z "$b" ] && b=$(pick 'bundle[^/]*\.html$|/bundled/[0-9]+\.html$')
    dm=$(pick '/default/code\.demo[^/]*\.tsx$');       [ -z "$dm" ] && dm=$(pick 'demo[^/]*\.tsx$')
    p=$(pick '/default/preview[^/]*\.(png|webp|jpg)$'); [ -z "$p" ] && p=$(pick 'preview[^/]*\.(png|webp)$')
    v=$(pick '/default/video[^/]*\.mp4$');             [ -z "$v" ] && v=$(pick '\.mp4$')
    [ -n "$b" ]  && curl -sL -o "$d/bundle.html" "$b"
    [ -n "$dm" ] && curl -sL -o "$d/demo.tsx" "$dm"
    [ -n "$p" ]  && curl -sL -o "$d/preview.${p##*.}" "$p"
    [ -n "$v" ]  && curl -sL -o "$d/preview.mp4" "$v"
    grep -oE '\\"dependencies\\":\{[^}]*\}' "$d/page.html" | head -1 > "$d/deps.txt"
    grep -oE '\\"description\\":\\"[^\\]*' "$d/page.html" | head -1 > "$d/desc.txt"
    ok=$(grep -c createRoot "$d/bundle.html" 2>/dev/null || echo 0)
    echo "$author/$slug bundle=$([ "$ok" -gt 0 ] && echo ok || echo MISSING)"
  ) &
done
wait
