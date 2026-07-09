FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --include=dev
RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
