FROM node:20

# RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

# RUN npm cache clean
RUN npm install

COPY . /usr/src/app
EXPOSE 3001

CMD ["node","server.js"]
