FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 8080
CMD ["node", "./dist/app.js"]