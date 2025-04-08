FROM nginx:alpine

# تثبيت ال dependencies المطلوبة
RUN apk add --no-cache nodejs npm

# نسخ ملفات المشروع
COPY ./public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# تهيئة Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# تعريض المنفذ
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]