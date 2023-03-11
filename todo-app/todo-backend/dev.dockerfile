FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

USER node

RUN npm install

CMD ["npm", "run", "dev"]
