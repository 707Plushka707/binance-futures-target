FROM node:lts-alpine as builder

RUN apk update && apk upgrade
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs
RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app

ENV NODE_ENV=production

ENV NPM_CONFIG_LOGLEVEL=warn

COPY package*.json ./

RUN npm install && npm audit fix && npm cache clean --force

COPY --chown=nodejs:nodejs . .

EXPOSE 5001

CMD [ "node", "./app.js" ]