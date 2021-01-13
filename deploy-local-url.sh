

cd api
tsc
docker build -t amiradar/tiny-url.api .
docker container rm tiny-url.api -f
docker run -p 80:8080 -d --name=tiny-url.api amiradar/tiny-url.api


cd ../urlService
tsc
docker build -t amiradar/tiny-url.url-service .
docker container rm tiny-url.url-service -f
docker run -p 3000:8080 -d --name=tiny-url.url-service amiradar/tiny-url.url-service


cd ../userService
tsc
docker build -t amiradar/tiny-url.user-service .
docker container rm tiny-url.user-service -f
docker run -p 4000:8080 -d --name=tiny-url.user-service amiradar/tiny-url.user-service


cd ../authentication
tsc
docker build -t amiradar/tiny-url.authentication .
docker container rm tiny-url.authentication -f
docker run -p 5000:8080 -d --name=tiny-url.authentication amiradar/tiny-url.authentication

# docker run -p 8080:3000 -it --name=tiny-url.url-service amiradar/tiny-url.url-service bash