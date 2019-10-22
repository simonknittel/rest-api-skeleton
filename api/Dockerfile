# FROM node:12.12.0-buster-slim
FROM node:12.12.0-buster

HEALTHCHECK --interval=1m --timeout=10s --start-period=5s --retries=3 CMD [ "curl", "-f", "http://localhost:8000" ]

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY src ./src/

CMD [ "npm", "start" ]
