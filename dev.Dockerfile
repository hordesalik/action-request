FROM node:22.1.0-slim

WORKDIR /src

CMD ["node", "./node_modules/nodemon/bin/nodemon.js", "--inspect=0.0.0.0", "server.js", "-e", "js", "--legacy-watch"]
