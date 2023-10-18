FROM node:18.16.1

WORKDIR /home/node/app

# Install deps
COPY . ./home/node/app


COPY . .

COPY ./package.json .
RUN npm install --production
RUN npm cache clean  --force
RUN npm prune --production



# Start the app
EXPOSE 3000
ENV NODE_ENV production
ENV PORT 3000

CMD [ "npm", "start" ]
