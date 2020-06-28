FROM node:10

WORKDIR /app

COPY package*.json /app/

RUN npm install --production

COPY index.js /app

CMD ["node", "/app/index.js"]
