FROM node:18-bullseye
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
CMD ["bash", "./docker/run.sh"]
