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
	make build-image