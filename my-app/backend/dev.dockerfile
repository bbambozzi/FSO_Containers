FROM node:16 as base

WORKDIR /usr/src/app/

COPY --chown=node:node . . 

RUN npm install

CMD ["npm", "run", "dev"]
