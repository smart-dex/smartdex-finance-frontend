ifndef u
u:=sotatek
endif

ifndef env
env:=dev
endif

OS:=$(shell uname)

build-image:
	docker build -t SmartDEX-frontend .
	docker tag SmartDEX-frontend registry-server:5000/smartdex-frontend:latest
	docker push registry-server:5000/smartdex-frontend:latest

build-staging:
	npm run build:staging
	
build-development:
	npm run build:development

build-production:
	sudo npm install env-cmd --save 
	npm run build:production

deploy-development:
	make build-development
	rsync -a build  sotatek@192.168.1.206:/var/www/test/smartdex-finance

deploy-staging:
	make build-staging
	rsync -a build  ubuntu@35.73.146.166:/var/www/smart-dex/smartdex-finance
locale:
	cd craw_language && npm start