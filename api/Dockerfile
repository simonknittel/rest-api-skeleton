FROM node:12.19.1-alpine

WORKDIR /app

HEALTHCHECK --interval=1m --timeout=10s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:8000" ]

# Required for ???
RUN apk add --no-cache --virtual builds-deps build-base python

COPY package*.json ./
RUN npm ci --production

COPY src ./src/

CMD [ "npm", "start" ]
