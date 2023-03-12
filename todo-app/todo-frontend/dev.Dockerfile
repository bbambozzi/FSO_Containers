# for development only
FROM node:16 as base

WORKDIR /usr/src/app/

COPY --chown=node:node . . 

USER node

RUN npm install
# we want dev dependencies, so no --production

CMD ["npm", "start"]
# command to start in dev mode
