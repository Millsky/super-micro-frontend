FROM kyle83567/frontend-server:v14

COPY build /app/dist/
COPY deps.js /app/

CMD ["node", "--experimental-modules", "/app/index.js"]
