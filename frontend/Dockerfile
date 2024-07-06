# Этап сборки фронтенда
FROM node:20.9.0 AS build

WORKDIR /app

# Копируем зависимости
COPY app/package*.json ./
RUN npm install

# Копируем остальные файлы исходного кода
COPY app .

# Собираем проект
RUN npm run build

# Второй этап: Nginx для сервера статики
FROM nginx:alpine

# Копируем собранные файлы из этапа сборки frontend в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY app/frontend.conf /etc/nginx/conf.d/

# Открываем порт 80 для веб-сервера
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
