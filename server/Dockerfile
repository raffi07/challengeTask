FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

#RUN npm run seeder --v
#RUN npm run seeder --i

EXPOSE 8080

CMD ["npm","start"]