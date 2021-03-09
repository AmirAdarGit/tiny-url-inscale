cd api
tsc
docker build -t amiradar/tiny-url.api .

cd ../urlService
tsc
docker build -t amiradar/tiny-url.url-service .

cd ../userService
tsc
docker build -t amiradar/tiny-url.user-service .

cd ../emailConsume
tsc
docker build -t amiradar/tiny-url.email-consume .

cd ../authentication
tsc
docker build -t amiradar/tiny-url.authentication .


