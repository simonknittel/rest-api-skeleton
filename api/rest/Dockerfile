FROM node:12.16.1-alpine

WORKDIR /api/rest

HEALTHCHECK --interval=1m --timeout=10s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:8000" ]

# Required for ???
RUN apk add --no-cache --virtual builds-deps build-base python

COPY ./rest/package*.json ./
RUN npm ci --production
RUN mv ./node_modules ../

COPY ./shared ../shared
COPY ./rest/src ./src

CMD [ "npm", "start" ]
