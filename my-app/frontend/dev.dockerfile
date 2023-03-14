FROM node as base

WORKDIR /app/

COPY . .

RUN npm install

CMD ["npm", "start"]
