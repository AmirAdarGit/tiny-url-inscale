

cd api
tsc
docker build -t amiradar/tiny-url.api .
docker container rm tiny-url.api -f
docker run -d -p 80:8080 -d --name=tiny-url.api amiradar/tiny-url.api


cd ../urlService
tsc
docker build -t amiradar/tiny-url.url-service .
docker container rm tiny-url.url-service -f
docker run -d -p 3000:8080 --name=tiny-url.url-service amiradar/tiny-url.url-service


cd ../userService
tsc
docker build -t amiradar/tiny-url.user-service .
docker container rm tiny-url.user-service -f
docker run -d -p 3001:8080 -d --name=tiny-url.user-service amiradar/tiny-url.user-service

# docker run -p 8080:3000 -it --name=tiny-url.url-service amiradar/tiny-url.url-service bash