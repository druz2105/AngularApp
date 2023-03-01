FROM node:18-bullseye
RUN apt-get update -y
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
RUN npm run build
CMD ["bash", "./docker/run.sh"]
