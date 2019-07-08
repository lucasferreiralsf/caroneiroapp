FROM node:10
RUN mkdir -p /api
WORKDIR /api
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]