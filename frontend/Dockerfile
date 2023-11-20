# Stage 1: Build
FROM node:20 as build

WORKDIR /usr/src/app

COPY package.json /usr/src/app

# RUN npm cache clean

RUN npm install

COPY . /usr/src/app
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/lets-decide /usr/share/nginx/html

# EXPOSE 4200
# CMD ["ng", "serve"]
