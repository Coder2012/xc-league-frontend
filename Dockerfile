FROM node:14

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
