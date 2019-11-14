FROM nginx:alpine

COPY nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY dist /usr/share/nginx/html

CMD sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
