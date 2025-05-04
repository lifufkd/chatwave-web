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
  export SSL_REDIRECT_OR_PROXY="return 301 https://\$host\$request_uri;"

  export SSL_SERVER_BLOCK="
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
  "
else
  export SSL_REDIRECT_OR_PROXY="
    server_name  localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }
  "

  export SSL_SERVER_BLOCK=""
fi

envsubst "$(env | cut -d= -f1 | sed 's/^/$/')" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Run nginx
exec nginx -g 'daemon off;'