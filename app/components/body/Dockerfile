FROM kyle83567/frontend-server:v16

COPY build /app/dist/
COPY deps.js /app/

CMD ["node", "--experimental-modules", "/app/index.js"]
