FROM node:alpine as task_manager
WORKDIR /app
COPY . .
RUN npm install
CMD [ "npm", "start" ]