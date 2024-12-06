.PHONY: go local server sass postgres docker

go: 
	reflex -s -v go run cmd/server/main.go

run: 
	sudo docker build -t baum-server . 
	sudo docker run -p 3000:3000 baum-server

docker:
	sudo docker build -t baum-server .
	sudo docker tag baum-server tiborb6/baum-server
	sudo docker push tiborb6/baum-server:latest

launch:
	sudo yum update -y 
	sudo amazon-linux-extras install docker -y
	sudo service docker start
	docker run -d --rm -ti --network host -e POSTGRES_PASSWORD=secret postgres
	sudo docker pull tiborb6/baum-server:latest
	sudo docker run -d -p 80:3000 tiborb6/baum-server:latest

sass:
	sass --watch static/styles/dev:static/styles/ --style compressed --no-source-map

postgres:
	docker run -d --rm -ti --network host -e POSTGRES_PASSWORD=secret postgres

migrate-down:
	migrate -path db/migrations -database "postgresql://postgres:secret@localhost/?sslmode=disable" down