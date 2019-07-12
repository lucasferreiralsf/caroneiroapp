FROM node:12
WORKDIR /usr/src/api
COPY . .
RUN npm install -g @nestjs/cli && npm install
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]