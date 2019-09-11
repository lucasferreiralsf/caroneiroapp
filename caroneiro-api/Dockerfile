FROM node:12
WORKDIR /caroneiro/api
COPY package.json package.json
# RUN npm install -g @nestjs/cli
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7000
CMD [ "npm", "run", "start:dev" ]