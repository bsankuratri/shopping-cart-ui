From node:16.3.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
#COPY package-lock.json ./
COPY yarn.lock ./
RUN yarn global add react-scripts@3.4.1 --silent
RUN yarn install --ignore-engines
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
#COPY /app/build /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]