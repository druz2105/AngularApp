FROM node:18-bullseye
ENV DEBIAN_FRONTEND=noninteractive
RUN wget -O - http://nginx.org/keys/nginx_signing.key | apt-key add - && \
echo "deb http://nginx.org/packages/debian/ buster nginx" | tee -a /etc/apt/sources.list && \
echo "deb-src http://nginx.org/packages/debian/ buster nginx" | tee -a /etc/apt/sources.list && \
apt-get update -y && \
apt-get install -y nginx supervisor && \
apt-get install -y nginx-extras && \
echo "daemon off;" >> /etc/nginx/nginx.conf && \
rm -rf /var/lib/apt/lists/*
ARG NODE_ENV=local
ENV NODE_ENV $NODE_ENV
WORKDIR /app

# take advantage of cached Docker layers
COPY package*.json ./
RUN npm install --location=global npm && npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["bash", "./docker/run.sh"]
