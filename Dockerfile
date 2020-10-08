FROM node:stretch-slim
<<<<<<< HEAD
RUN mkdir -p /api
WORKDIR /api
COPY package*.json ./
RUN npm install 
COPY . . 
EXPOSE 4000 
CMD ["npm","start"]
=======
WORKDIR /usr/src/app/microservice-transaction
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
>>>>>>> 762ec5970903d6cbe3fbd50bc28190f601e65aa9
