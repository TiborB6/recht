This is a university project for data and information law.

# Host
[Link text](https://fein-app.com)

# Installation
For arm64
```codeline
	sudo docker pull tiborb6/software-server:latest
	sudo docker run -d -p 3002:3000 tiborb6/software-server:latest
```

Else clone repo and 
```codeline
	sudo docker build -t software-server . 
	sudo docker run -p 3002:3000 software-server
```
