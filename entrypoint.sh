#!/bin/sh

API_URL="${API_URL:-http://127.0.0.1}"
API_PORT="${API_PORT:-8000}"
API_BASE_URL="${API_URL}:${API_PORT}"
JWT_ACCESS_TOKEN_EXPIRES="${JWT_ACCESS_TOKEN_EXPIRES:-1209500}"
LONG_POLLING_DELAY="${LONG_POLLING_DELAY:-1}"
DEFAULT_MESSAGES_QUANTITY="${DEFAULT_MESSAGES_QUANTITY:-20}"

cat <<EOF > /usr/share/nginx/html/js/config.js
export const API_BASE_URL = "${API_BASE_URL}";
export const API_TOKEN_LIFESPAN = ${JWT_ACCESS_TOKEN_EXPIRES};
export const LONG_POLLING_DELAY = ${LONG_POLLING_DELAY};
export const DEFAULT_MESSAGES_QUANTITY = ${DEFAULT_MESSAGES_QUANTITY};
EOF

if [ -n "$SSL_CERT_PATH" ] && [ -n "$SSL_CERT_KEY" ]; then
  HTTPS_BLOCK=$(cat <<EOF
    server {
        listen 443 ssl;
        server_name localhost;

        ssl_certificate     $SSL_CERT_PATH;
        ssl_certificate_key $SSL_CERT_KEY;

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files \$uri \$uri/ =404;
        }
    }
EOF
)
else
  HTTPS_BLOCK=""
fi

envsubst '{{HTTPS_BLOCK}}' < /etc/nginx/nginx.conf.template | \
  sed "s|{{HTTPS_BLOCK}}|$HTTPS_BLOCK|" > /etc/nginx/nginx.conf

exec nginx -g 'daemon off;'