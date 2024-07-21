FROM node:18-alpine AS builder
ENV NG_APP_API=/api
WORKDIR /app

COPY package.json .

# если по какой-то причине билд не собирается, можно сделать билд в проекте командой
# npm run build, и потом просто копируется готовый билд в образ
# ВАЖНО! В этом случае не будет автоматической подстановки значений переменных из .env
# Потребуется установить нужные значения переменных, сделать билд.

# если нужна сборка билда при создании образа - раскомментировать строку ниже
# RUN  npm install

COPY . .

# если нужна сборка билда при создании образа - раскомментировать строку ниже
# RUN npm run build



FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/
