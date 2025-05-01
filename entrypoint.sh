#!/bin/sh

API_URL="${API_URL:-http://127.0.0.1}"
API_PORT="${API_PORT:-8000}"

# Соберём итоговый URL
export API_BASE_URL="${API_URL}:${API_PORT}"

envsubst < /usr/share/nginx/html/js/config.js.template > /usr/share/nginx/html/js/config.js

exec nginx -g 'daemon off;'