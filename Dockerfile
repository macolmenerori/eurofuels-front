# Stage 1: build project
FROM node:24-alpine as builder
LABEL app="eurofuels-front" stack.binary="node" stack.version="24-alpine"

RUN corepack enable

WORKDIR /usr/app

COPY app app
COPY public public
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY pnpm-workspace.yaml pnpm-workspace.yaml
COPY react-router.config.ts react-router.config.ts
COPY .prettierrc .prettierrc
COPY eslint.config.js eslint.config.js
COPY tsconfig.json tsconfig.json
COPY vite.config.ts vite.config.ts
COPY vitest.config.ts vitest.config.ts

RUN pnpm i --frozen-lockfile
RUN pnpm build

# Stage 2: serve project
FROM nginx:stable-alpine
LABEL app="eurofuels-front" stack.binary="nginx" stack.version="stable-alpine"

COPY --from=builder /usr/app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
