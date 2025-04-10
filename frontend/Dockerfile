FROM nginx:1.25.3-alpine-slim

# Create necessary directories and set permissions before copying files
RUN mkdir -p /var/run/nginx && \
    mkdir -p /var/cache/nginx && \
    mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/run/nginx && \
    chmod -R 755 /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx

# Create necessary directories with proper permissions
RUN mkdir -p /etc/nginx/ssl /etc/nginx/conf.d /app/uploads && \
    chmod -R 755 /etc/nginx/ssl /etc/nginx/conf.d /app/uploads

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy your entire application files
COPY ./src /usr/share/nginx/html/

# Ensure index.html exists and has proper permissions
RUN if [ ! -f /usr/share/nginx/html/index.html ]; then \
        echo "<html><body><h1>Welcome</h1></body></html>" > /usr/share/nginx/html/index.html; \
    fi

# Set permissions for static files
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port 80 (HTTP)
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]