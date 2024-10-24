FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
RUN npm run test

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/src/seeds ./src/seeds

RUN npm install --only=production

EXPOSE 4000

CMD ["node","dist/index.js" ]