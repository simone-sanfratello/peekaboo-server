FROM node:12

# build ui and copy to /ui
# add file-serve to server

ENV PEEKABOO_APP_PORT=8080 \
    PEEKABOO_LOG_LEVEL=warn \
    PEEKABOO_LOG_PRETTY=false \
    PEEKABOO_RELAY_TIMEOUT=20000

WORKDIR /app
COPY package.json /app
RUN npm i

WORKDIR /app
COPY . /app
RUN npm run build

CMD APP_PORT=$PEEKABOO_APP_PORT \
  LOG_LEVEL=$PEEKABOO_LOG_LEVEL \
  LOG_PRETTY=$PEEKABOO_LOG_PRETTY \
  RELAY_TIMEOUT=$PEEKABOO_RELAY_TIMEOUT \
  node bin/peekaboo-server.js
