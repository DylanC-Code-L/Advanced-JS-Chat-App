FROM node:current-slim
WORKDIR /app/
COPY package*.json /app/

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

COPY . /app/
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 3000
CMD ["npm","run","start"]