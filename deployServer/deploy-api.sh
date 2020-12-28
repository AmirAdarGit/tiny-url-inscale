docker login --username=amiradar --password=amiradar123

docker pull amiradar/tiny-url.api

docker container rm tiny-url.api -f

docker run -p 80:8080 -d --name=tiny-url.api amiradar/tiny-url.api