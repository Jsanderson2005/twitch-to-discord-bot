FROM node:15

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN node -e 'require("./test_config.js").TestConfig()'

CMD [ "node", "server.js" ]
