ifndef u
u:=sotatek
endif

ifndef env
env:=dev
endif

OS:=$(shell uname)

build-image:
	docker build -t pancake-frontend .
	docker tag pancake-frontend registry-server:5000/pancake-frontend:latest
	docker push registry-server:5000/pancake-frontend:latest

deploy:
	rsync -a /var/www/smartdex/smartdex-finance  sotatek@192.168.1.206:/var/www/test