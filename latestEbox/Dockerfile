FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install -g npm@8.15.0

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]