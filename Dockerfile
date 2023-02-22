FROM node:14-alpine3.14 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY package*.json /home/node

RUN npm install

COPY . /home/node

RUN npm run build 
RUN npm prune --production
EXPOSE 80


# ---

FROM node:14-alpine3.14

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/


EXPOSE 80
CMD ["node", "dist/main.js"]


