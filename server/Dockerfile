FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN node seeder.js --v
RUN node seeder.js --i

EXPOSE 8080

CMD ["npm","start"]