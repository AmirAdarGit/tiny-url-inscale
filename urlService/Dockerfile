FROM node:12

WORKDIR /usr/app


COPY ./dist /dist
COPY package.json /package.json


RUN npm install

CMD ["npm" , "run", "prod"]