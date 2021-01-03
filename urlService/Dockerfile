FROM node:12

WORKDIR /usr/app

COPY ./dist .
COPY ./package.json .


RUN npm install

CMD ["npm" , "run", "prod"]