.PHONY: go local server sass postgres docker

go: 
	reflex -s -v go run cmd/server/main.go

run: 
	sudo docker build -t software-server . 
	sudo docker run -p 3002:3000 software-server

docker:
	sudo docker build -t software-server .
	sudo docker tag software-server tiborb6/software-server
	sudo docker push tiborb6/software-server:latest

launch:
	sudo yum update -y 
	sudo amazon-linux-extras install docker -y
	sudo service docker start
	docker run -d --rm -ti --network host -e POSTGRES_PASSWORD=secret postgres
	sudo docker pull tiborb6/software-server:latest
	sudo docker run -d -p 80:3000 tiborb6/software-server:latest

sass:
	sass --watch static/styles/dev:static/styles/ --style compressed --no-source-map

postgres:
	docker run -d --rm -ti --network host -e POSTGRES_PASSWORD=secret postgres

migrate-down:
	migrate -path db/migrations -database "postgresql://postgres:secret@localhost/?sslmode=disable" down