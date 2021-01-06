docker login --username=amiradar --password=amiradar123

docker pull amiradar/tiny-url.url-service

docker container rm tiny-url.url-service -f

docker run -p 3000:8080 -d --name=tiny-url.url-service amiradar/tiny-url.url-service