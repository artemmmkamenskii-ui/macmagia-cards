#!/usr/bin/env bash
# Снимает редирект с / на /cards/ (строки return 301|308 /cards/ в nginx).
# Запуск на сервере: bash ~/macmagia/deploy/remove-nginx-root-to-cards.sh
# Нужен sudo без пароля ИЛИ запуск: sudo bash …/remove-nginx-root-to-cards.sh
set -euo pipefail

if [ "$(id -u)" -eq 0 ]; then
  SUDO=()
else
  SUDO=(sudo -n) # без запроса пароля; если нужен пароль — запустите: sudo bash …
fi

run() { "${SUDO[@]}" "$@"; }

FOUND=0
shopt -s nullglob
for path in /etc/nginx/sites-enabled/*; do
  [ -e "$path" ] || continue
  f=$(run readlink -f "$path" 2>/dev/null) || f="$path"
  run test -f "$f" || continue
  if run grep -qE 'return[[:space:]]+30[18][[:space:]]+/cards' "$f" 2>/dev/null; then
    echo "remove-nginx: patch $f"
    run cp "$f" "$f.bak-redirect-$(date +%Y%m%d%H%M%S)"
    run sed -i '/return[[:space:]]*30[18][[:space:]]*\/cards\//d' "$f"
    FOUND=1
  fi
done

if [ "$FOUND" -eq 0 ]; then
  echo "remove-nginx: no 'return 30x /cards' lines (OK or check config manually)."
  exit 0
fi

run nginx -t
run systemctl reload nginx
echo "remove-nginx: done."
