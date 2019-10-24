FROM node:12.12.0-alpine

WORKDIR /app

HEALTHCHECK --interval=1m --timeout=10s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:8000" ]

RUN apk add --no-cache --virtual builds-deps build-base python

COPY gc-service-account.json ./

COPY package*.json ./
RUN npm install --production

COPY src ./src/

CMD [ "npm", "start" ]
