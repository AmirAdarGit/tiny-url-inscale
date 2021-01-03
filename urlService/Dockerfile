FROM node:12

WORKDIR /usr/app

COPY ./package.json ./package.json
COPY ./dist ./dist

RUN npm install

CMD ["npm" , "run", "prod"]