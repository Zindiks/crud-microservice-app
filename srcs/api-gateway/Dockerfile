# FROM alpine:3.20 AS build

# RUN apk add --no-cache nodejs npm
# RUN npm install -g typescript

# WORKDIR /gateway-app

# COPY package.json tsconfig.json ./

# RUN npm install


# RUN npm run build

# FROM alpine:3.20

# RUN apk add --no-cache nodejs npm
# RUN npm install pm2 -g

# WORKDIR /gateway-app

# COPY --from=build /gateway-app/dist ./dist
# COPY --from=build /gateway-app/node_modules ./node_modules
# COPY --from=build /gateway-app/package.json ./

# # EXPOSE $GATEWAY_APP_PORT

# CMD ["npm", "start"]



FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
# RUN npm run test

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production


CMD ["node","dist/index.js" ]