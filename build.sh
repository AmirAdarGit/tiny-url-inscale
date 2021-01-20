cd api
tsc
docker build -t amiradar/tiny-url.api .


cd ../urlService
tsc
docker build -t amiradar/tiny-url.url-service .


cd ../userService
tsc
docker build -t amiradar/tiny-url.user-service .


cd ../authentication/server
tsc
docker build -t amiradar/tiny-url.authentication .