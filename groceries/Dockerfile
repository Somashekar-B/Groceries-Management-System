FROM node:latest

WORKDIR /usr/bin/app

COPY . .

EXPOSE 3000

RUN npm install -g typescript

RUN npm install

RUN tsc

CMD ["node", "dist/server.js"]