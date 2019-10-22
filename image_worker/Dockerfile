FROM node:12.12.0-alpine

WORKDIR /app

RUN apk add --no-cache ffmpeg

COPY package*.json ./
RUN npm install --production

COPY src ./src/

CMD [ "npm", "start" ]
