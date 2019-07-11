FROM node:12
WORKDIR /usr/src/api
RUN npm install -g strapi@3.0.0-beta.11
COPY . .
RUN npm install
EXPOSE 1337
CMD strapi dev
