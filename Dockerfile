FROM node:12 as builder
ARG REACT_APP_BASE_URL
ARG REACT_APP_API_URL
ARG REACT_APP_SERVER_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
