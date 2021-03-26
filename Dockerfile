FROM node:10.20.1 as build-deps
ARG BUILD_API_NAME=local
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . ./
RUN npm run build:${BUILD_API_NAME}
FROM nginx:1.14-alpine
ARG BUILD_DIST_NAME=local
COPY --from=build-deps /usr/src/app/dist/${BUILD_DIST_NAME} /usr/share/nginx/html/
COPY --from=build-deps /usr/src/app/nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]