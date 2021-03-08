# Tiny url inscale
 
Web application where a user can generate a short url for a given url.

## Introduction

In this project I implemented the backend of the familiar app - tiny url.
In order to maximize the ability of each service i use the microservice methodology and use Docker to run the images on containers.
The microservices:
Api module- The only server that is exposed to the world.
On local enviroment in host: `localhost:3001`.
On production enviroment In  host: `ec2-3-127-150-52.eu-central-1.compute.amazonaws.com:80`

User Service module: server that expose post and get http methods.
post: create new user and insert it to mySql database.
get: get the user properties from mySql database.

Url service module: server that expose post and get http methods.
post: create new short url from given long url, and insert them in to mySql database.
get: get Url from givan short url, resive the data from mySql database.

Authentication module: server that used for sign up and log in flows, and validation user Token.

Email consumer module: microservice that use to consume data from SQS i.e. user email, in order to send "sign up welcome email" for the new user.

Deploy service module: //TODO: complete.
## Dependencies

In this project I used Docker to run the images on containers, so make sure you have a version of docker installed on your computer.
Use this link [Docker](https://docs.docker.com/get-docker/) to install Docker.

In order to manage all the microservices together we will use Docker Compose. <br/>
It is a tool for running multi-container applications on Docker, defined in `docker-compose.yml` file.
Use this link [Docker Compose](https://docs.docker.com/compose/install/) to install Docker Compose.

Run the following MakeFile Scripts to run the project localy:

## installation

run: `make install_dependencies`  <br/>

will ruh the folowing npm commands:
npm i -g recursive-install - Takes the tree files and checks for package.json in every folder and runs npm in every folder.
npm-recursive-install --skip-root - Skip the root package.json install.
npm install -g typescript - Installation typescript globally on the computer with `tsc` command.

## instructions

run: `make build_and_deploy`  <br/>

will run the following scripts:
1) sh build.sh - run script for each microservic.  
    * first, transcompil each source code from typescript to javascript, `tsc`.
    * second, build the images from the source code using the Dockerfile, i.e. `docker build -t amiradar/tiny-url.api .`
2) docker-compose up
    * look for `docker-compose.yml` and run the images on containers and manage them together, and wait for http reqest on localhost, port 3001: `http://localhost:3001` 
   

## Api Documentations:

There are 4 main flows to the project.
1) sign up
2) log in
3) create url
4) get url

For each flow there is an http request which will execute the API.

In order to make the http request you can use the Postman app or vsCode extension (request.rest).

### sign up flow:





