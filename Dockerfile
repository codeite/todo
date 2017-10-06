FROM node:6.10.3

# Create app directory
RUN mkdir -p /usr/app/server/src
WORKDIR /usr/app/server/src

# Install app dependencies
COPY server/package.json /usr/app/server
RUN npm install --production

# copy common
RUN mkdir -p /usr/app/src/common
COPY src/common /usr/app/src/common

# copy app
COPY server/src /usr/app/server/src

EXPOSE 12010
CMD [ "npm", "start" ]
