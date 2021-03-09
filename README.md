# Tiny url inscale
 
Web application where a user can generate a short url for a given url.<br/>

## Introduction

In this project I implemented the backend of the familiar app - tiny url.<br/>
In order to maximize the ability of each service i use the microservice methodology and use Docker to run the images on containers.<br/>

The microservices descriptiens:<br/>

Api module- The only server that is exposed to the world.<br/>
On local enviroment in host: `localhost:3001`<br/>
On production enviroment In  host: `ec2-3-127-150-52.eu-central-1.compute.amazonaws.com:80`<br/>

User Service module: server that expose post and get http methods.<br/>
post: create new user and insert it to mySql database.<br/>
get: get the user properties from mySql database.<br/>

Url service module: server that expose post and get http methods.<br/>
post: create new short url from given long url, and insert them in to mySql database.<br/>
get: get Url from givan short url, resive the data from mySql database.<br/>

Authentication module: server that used for sign up and log in flows, and validation user Token.<br/>

Email consumer module: microservice that use to consume data from SQS.
i.e. user email, in order to send "sign up welcome email" for the new user.<br/>

Deploy service module: //TODO: complete.

## Dependencies

In this project I used Docker to run the images on containers, so make sure you have a version of docker installed on your computer.<br/>
Use this link [Docker](https://docs.docker.com/get-docker/) to install Docker.<br/>

In order to manage all the microservices together we will use Docker Compose. <br/>
It is a tool for running multi-container applications on Docker, defined in `docker-compose.yml` file.<br/>
Use this link [Docker Compose](https://docs.docker.com/compose/install/) to install Docker Compose.<br/>

Run the following MakeFile Scripts to run the project localy:<br/>

## installation

run: `make install_dependencies`  <br/>

will ruh the folowing npm commands:<br/>
npm i -g recursive-install - Takes the tree files and checks for package.json in every folder and runs npm in every folder.<br/>
npm-recursive-install --skip-root - Skip the root package.json install.<br/>
npm install -g typescript - Installation typescript globally on the computer with `tsc` command.<br/>

## instructions

run: `make build_and_deploy`  <br/>

will run the following scripts:<br/>
1) sh build.sh - run script for each microservic.  <br/>
    * first, transcompil each source code from typescript to javascript, `tsc`.<br/>
    * second, build the images from the source code using the Dockerfile, i.e. `docker build -t amiradar/tiny-url.api .`<br/>
2) docker-compose up<br/>
    * look for `docker-compose.yml` and run the images on containers and manage them together, and wait for http reqest on localhost, port 3001: `http://localhost:3001` <br/>
   

## Api Documentations:

There are 4 main flows to the project.
1) sign up
2) log in
3) create url
4) get url

For each flow there is an http request which will execute the API.

In order to make the http request you can use the Postman app or vsCode extension (request.rest).

## Sign up flow:

![image](https://user-images.githubusercontent.com/44618095/110476715-f66d6880-80ea-11eb-8fa5-d8d001250b4d.png)

## Log in flow:

![image](https://user-images.githubusercontent.com/44618095/110477145-7c89af00-80eb-11eb-8792-6959a2fc3c7b.png)

## Create new url

![image](https://user-images.githubusercontent.com/44618095/110478924-83192600-80ed-11eb-806e-1599966ce5f8.png)





