# FROM node:18.15 as build

# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run prod

# FROM nginx:1.25.2

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist/chat-frontend /usr/share/nginx/html
# EXPOSE 80

# FROM node:18.15 AS build

# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# # this will build the browser and server files:
# RUN npm run build:ssr
# FROM nginx:1.25.2 AS client-browser

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist/chat-frontend /usr/share/nginx/html
# FROM node:13.10.1-alpine AS ssr-server
# COPY --from=build /app/dist /app/dist/
# COPY ./package.json /app/package.json 
# WORKDIR /app
# EXPOSE 4000
# CMD npm run serve:ssr

FROM node:18.15 AS build
WORKDIR /app
COPY ./package.json /app/
RUN npm install
COPY . /app/
# this will build the browser and server files:
RUN npm run build:ssr
FROM nginx:1.25.2 AS client-browser
COPY --from=build /app/dist/client/browser/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
FROM node:18.15-alpine AS ssr-server
COPY --from=build /app/dist /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app
EXPOSE 4000
CMD npm run serve:ssr