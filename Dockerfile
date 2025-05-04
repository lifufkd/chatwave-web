FROM nginx:alpine

RUN apk add --no-cache bash gettext

COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY entrypoint.sh /entrypoint.sh
COPY . /usr/share/nginx/html/

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
