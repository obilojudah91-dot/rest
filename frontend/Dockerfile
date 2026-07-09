FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY next.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.js ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
