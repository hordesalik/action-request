FROM node:22.1.0-slim

COPY ./src /src

WORKDIR /src

CMD ["node", "server.js"]
