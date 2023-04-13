FROM node:19.9.0

WORKDIR "/Back-end"

COPY . "/Back-end"

RUN npm install

VOLUME [ "/Back-end/node_modules" ]

EXPOSE 8000

CMD [ "npm", "start" ]