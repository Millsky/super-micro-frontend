FROM node:14

WORKDIR /app

COPY ./src/frontend_service.proto package*.json /app/

RUN npm install --production

COPY ./src/index.js /app/

CMD ["node", "/app/index.mjs"]
