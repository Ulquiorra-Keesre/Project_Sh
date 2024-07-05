FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm config set fetch-timeout 100000
RUN npm install

COPY . .

CMD ["npm", "start"]
