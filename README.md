# Tiny url inscale
 
Web application where a user can generate a short url for a given url.

## Introduction

In this project I implemented the backend of the familiar app - tiny url.

## Dependencies

In this project I used Docker to run the images on containers, so make sure you have a version of docker installed on your computer.
Use this link [Docker](https://docs.docker.com/get-docker/) to install Docker.

In order to manage all the microservices together we will use Docker Compose. <br/>
It is a tool for running multi-container applications on Docker, defined in `docker-compose.yml` file.

Run the following MakeFile Scripts to run the project:

run: make `install_dependencies`

will ruh the folowing npm commands:
npm i -g recursive-install - Takes the tree files and checks for package.json in every folder and runs npm in every folder.
npm-recursive-install --skip-root - Skip the root package.json install.
npm install -g typescript - Installation typescript globally on the computer with `tsc` command.

run: make `build_and_deploy`

will run the following scripts:
sh build.sh - run script for each microservic.  
first, transcompil each source code from typescript to javascript, `tsc`.
second, build the images from the source using the Dockerfile, i.e. `docker build -t amiradar/tiny-url.api .`
docker-compose up 





There are 4 main flows to the project.
1) sign up
2) log in
3) create url
4) get url

For each flow there is an http request which will execute the API.

In order to make the http request you can use the Postman app or vsCode extension (request.rest).





