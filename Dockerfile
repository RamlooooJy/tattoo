# Используем официальный Node.js образ
FROM node:18-alpine
# Рабочая директория в контейнере
WORKDIR /app
# Копируем package.json и package-lock.json для кеширования зависимостей
COPY package.json package-lock.json ./
# Устанавливаем зависимости
RUN npm ci
# Копируем весь проект
COPY . .
# Генерируем Prisma клиент
RUN npx prisma generate
# Собираем Next.js проект
RUN npm run build
# Открываем порт 3000
EXPOSE 3000
# Запускаем Next.js в режиме production
CMD ["npm", "start"]
