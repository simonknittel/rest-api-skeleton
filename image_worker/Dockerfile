FROM node:12.12.0-alpine

WORKDIR /app

COPY gc-service-account.json ./

COPY package*.json ./
RUN npm install --production

COPY src ./src/

CMD [ "npm", "start" ]
