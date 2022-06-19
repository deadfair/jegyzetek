FROM node:latest                            // https://hub.docker.com/search?q=node.js
WORKDIR '/app'
COPY package.json ./
RUN npm install                             // .dockerignore -ba => node_modules 
COPY . .
CMD ["npm","run","start"]                   // 



# // package.json
# "docker:build": "docker build -t backend:1.0.0 .",
# "docker:run": "docker run -p 3000:3000 backend:1.0.0"   

# docker-compose.yml      // összekötni a mongóval
# version: '3'
# services:
#   app:
#     build: 
#       dockerfile: Dockerfile      // a Dockerfile-t keresse
#       context: .                  // itt ebbe a mappába
#     ports:
#       - "3000:3000"
#     links:
#       - mongo
#     volumes:
#       - ".:/app"                    // minden modosítást amit csinálunk az látszani fog nem kell ujra buildelni
#       - "/app/node_modules"         // és a node modulest is megtartjuk   
#   mongo:
#     container_name: mongo
#     image: mongo:latest
#     ports:
#       - "27017:27017"
#     volumes:
#       - "./data:/data/db"       // a külsö data mappába lesz megosztva az ami belül a data/db-be van így nem resetelődik ez a data mappa, kivezetjük a belső mappát