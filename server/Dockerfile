# BUILDER
FROM node as builder

WORKDIR /app

COPY package*.json /app/

COPY .env /app

# INSTALL
RUN npm ci

# INSTALL TS
RUN npm i typescript -g

COPY . /app

# COMPILE
RUN npm run build

#COPY TEMPLATES
COPY ./templates /app/dist/templates

# REMOVE DEV DEPENDENCIES
RUN npm prune --production

# RUNTIME
FROM node:slim as runtime

WORKDIR /app

ENV NODE_ENV=production

# COPY FILES FROM BUILDER
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/package.json /app/package.json

EXPOSE 4201

CMD ["npm", "run", "run:prod"]