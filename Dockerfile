FROM node:14-stretch-slim AS build
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:latest
RUN rm -f /etc/nginx/conf.d/default.conf
COPY /nginx/default.conf /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html
