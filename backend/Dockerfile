FROM node:20

# RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

# RUN npm cache clean
RUN npm install
RUN npm install cors

COPY . /usr/src/app
EXPOSE 3000

CMD ["node","server.js"]
