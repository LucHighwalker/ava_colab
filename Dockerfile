FROM node:12.16.1
ARG ENVIRONMENT

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g ts-node typescript nodemon

COPY package*.json ./

RUN npm install
RUN npm audit fix

COPY . /usr/src/app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait
RUN chmod +x ./node.sh

EXPOSE 3000

CMD /wait && ./node.sh