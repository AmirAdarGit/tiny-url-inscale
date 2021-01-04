docker login --username=amiradar --password=amiradar123

docker pull amiradar/tiny-url.user-service

docker container rm tiny-url.user-service -f

docker run -p 4000:8080 -d --name=tiny-url.user-service amiradar/tiny-url.user-service