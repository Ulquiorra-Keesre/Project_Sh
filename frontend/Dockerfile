# FROM node:14

# WORKDIR /app

# COPY app/package*.json ./

# RUN npm install

# COPY app/ .

# RUN npm run build

#  CMD ["npm", "start"]

# frontend/Dockerfile
FROM node:20.9.0 AS build

WORKDIR /app

COPY app/package.json app/package-lock.json ./
RUN npm install

COPY app ./

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
