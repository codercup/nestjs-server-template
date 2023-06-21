FROM node:16-alpine As development

WORKDIR /usr/src/app

# COPY package*.json ./
COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

FROM node:16-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]