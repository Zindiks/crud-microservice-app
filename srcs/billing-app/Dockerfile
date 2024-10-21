# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /billing-app

# Copy package files and install dependencies
COPY package.json tsconfig.json ./
RUN npm install

# Copy the source files and build
COPY src ./src
COPY server.ts ./
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /billing-app

# Copy the built files and dependencies
COPY --from=build /billing-app/dist ./dist
COPY --from=build /billing-app/node_modules ./node_modules
COPY --from=build /billing-app/package.json ./

EXPOSE $BILLING_APP_PORT

# Run the app
CMD ["npm", "run", "start"]