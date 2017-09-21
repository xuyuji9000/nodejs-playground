IMAGE_NAME=node-img

compose-up:
	docker-compose up --build

clean-ctr:
	docker rm -f $(shell docker ps -aq)

clean-img:
	docker rmi -f $(shell docker images -aq)

clean: clean-ctr clean-img
