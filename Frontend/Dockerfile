# Build stage with Node.js v22.15.0
FROM node:22.15.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

# Run stage
FROM nginx:alpine
COPY --from=build /app/dist/Angular_16 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
