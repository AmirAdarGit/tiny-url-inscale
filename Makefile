build:
	sh scripts/build.sh
	
build_api: 
	cd api/scripts 
	sh build.sh

build_authentication:
	cd authentication/scripts
	sh build.sh

build_url_service:
	cd urlService/scripts
	sh build.sh

build_user_service:
	cd userService/scripts
	sh build.shls


deploy:
	docker-compose up

install_dependencies:
	sh scripts/install_dependencies.sh

build_and_deploy: build deploy

destroy:
	docker-compose down
