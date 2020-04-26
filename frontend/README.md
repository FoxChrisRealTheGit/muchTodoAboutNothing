# Much @TODO about nothing


# To Run the project

in development when using the backend, run 
```
npm run dev
```  


## Container
The repo uses docker containers to build and run the project in a mostly official capacity. Use the commands below to initiate and run local or production container builds.

### Local Build

 docker run -v ${PWD}:/app -v /app/node_modules -p 4201:4200 --rm example:dev


### Production Build

docker build -f Dockerfile-prod -t example:prod .

docker run -it -p 80:80 --rm example:prod

