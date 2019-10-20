# FROM node:12.12.0-buster-slim
FROM node:12.12.0-buster

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY src ./src/

CMD [ "npm", "start" ]
