FROM node:18.15 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run prod

FROM nginx:1.25.2

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/chat-frontend /usr/share/nginx/html
EXPOSE 80