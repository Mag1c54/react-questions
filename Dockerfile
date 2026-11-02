

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .


# docker build --build-arg VITE_API_URL=https://example.com/api при сборке если надо  .
ARG VITE_API_URL=https://api.yeatwork.ru
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# --- статика ---
FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
