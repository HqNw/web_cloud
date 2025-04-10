# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.25.3-alpine-slim

# Create necessary directories and set permissions before copying files
RUN mkdir -p /var/run/nginx && \
    mkdir -p /var/cache/nginx && \
    mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/run/nginx && \
    chmod -R 755 /var/run/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions for nginx config
RUN chown nginx:nginx /etc/nginx/conf.d/default.conf && \
    chmod 644 /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Set permissions for static files
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Run as non-root user
USER nginx

# Expose port 80 (HTTP)
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]