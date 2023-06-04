FROM node:20-alpine AS build
WORKDIR /build
COPY . .
RUN npm install -g typescript
RUN npm install && \
    npm run build

FROM nginx:1.25.0-alpine
WORKDIR /var/www/html
COPY --from=build /build/dist/ .
COPY --from=build /build/nginx.conf /etc/nginx/
