FROM node:14

WORKDIR /app

COPY frontend_service.proto package*.json /app/

RUN npm install --production

COPY index.js /app/

CMD ["node", "/app/index.js"]
