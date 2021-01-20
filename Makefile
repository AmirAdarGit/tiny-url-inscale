build:
	sh build.sh

deploy:
	docker-compose up

install_dependencies:
	sh install_dependencies.sh

build_and_deploy:
	build deploy

destroy:
	docker-compose down