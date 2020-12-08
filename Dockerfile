# BUILDER
FROM node as builder

WORKDIR /app

COPY package*.json /app/

COPY .env /app

# INSTALL
RUN npm ci

# INSTALL ANGULAR
RUN npm i -g @angular/cli@10.1.3

COPY . /app

# COMPILE
RUN npm run build

RUN ls /app/dist/ts-oven

# REMOVE DEV DEPENDENCIES
RUN npm prune --production

# RUNTIME
FROM nginx as runtime

WORKDIR /app

ENV NODE_ENV=production

# COPY FILES FROM BUILDER
# COPY --from=builder /app/dist /app/dist
# COPY --from=builder /app/node_modules /app/node_modules
# COPY --from=builder /app/.env /app/.env
# COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist/ts-oven /usr/share/nginx/html

RUN ls /usr/share/nginx/html

RUN cat /usr/share/nginx/html/index.html

# EXPOSE 4200

#CMD ["npm", "run", "run:prod"]

# FROM node

# WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

# COPY package*.json /app/
# COPY .env /app

# RUN npm ci

# RUN npm i -g @angular/cli@10.1.3

# COPY . /app

# CMD ng serve --host 0.0.0.0
