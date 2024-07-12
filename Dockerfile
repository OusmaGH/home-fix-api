FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package.json ./

RUN apk add --no-cache git && yarn install

COPY src ./src
COPY tsconfig.json ./
COPY .env ./
COPY nest-cli.json ./

RUN export $(cat .env | xargs -L 1)

RUN yarn install && yarn build

# Secondo stadio - Deployment
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/.env ./

EXPOSE 3000
CMD ["node","dist/main"]