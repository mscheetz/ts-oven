FROM node:12.18

RUN ls

WORKDIR /usr/src/app

COPY . .

RUN cat /sys/fs/cgroup/memory/memory.usage_in_bytes | awk '{ byte = $1 /1024/1024; print byte " MB" }'

RUN ls -lrt

# NPM INSTALL
RUN npm i typescript -g

RUN npm run install:server

RUN ls -lrt

# BUILD SERVER AND ANGULAR APP
#RUN npm run build:server:ui:prod
RUN npm run clean:dist

RUN ls -lrt

RUN pwd

#RUN cat /sys/fs/cgroup/memory/memory.usage_in_bytes | awk '{ byte = $1 /1024/1024; print byte " MB" }'

RUN npm run server:build:v2

RUN npm run copy-nm:server

RUN npm install

RUN npm run install:angularcli

RUN npm run ui:build:prod

RUN rm -rf node_modules/

RUN rm -rf server/

RUN rm -rf src/

#COPY /dist /app/
#COPY ./dist .
RUN ls -lrt

EXPOSE 3000

CMD ["node", "./dist/index.js"]