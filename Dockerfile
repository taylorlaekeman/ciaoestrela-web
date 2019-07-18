FROM node:12.2.0-alpine
COPY Makefile /app/
COPY package.json /app/package.json
COPY src /app/src
COPY public /app/public
RUN apk add make
RUN make -C app install
RUN make -C app build-app
CMD make -C app run
