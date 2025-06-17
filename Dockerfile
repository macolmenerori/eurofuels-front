# Stage 1: build project
FROM node:22-alpine as builder
LABEL app="eurofuels-front" stack.binary="node" stack.version="22-alpine"

RUN corepack enable

WORKDIR /usr/app

COPY src src
COPY public public
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY .npmrc .npmrc
COPY .prettierrc .prettierrc
COPY .prettierignore .prettierignore
COPY eslint.config.js eslint.config.js
COPY jest.config.ts jest.config.ts
COPY tsconfig.json tsconfig.json
COPY webpack.config.cjs webpack.config.cjs

RUN pnpm i --frozen-lockfile
RUN pnpm build

# Stage 2: serve project
FROM nginx:stable-alpine
LABEL app="eurofuels-front" stack.binary="nginx" stack.version="stable-alpine"

COPY --from=builder /usr/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
