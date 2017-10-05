FROM node:6.10.3

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app
RUN mkdir -p /usr/src/app/src
COPY ./src /usr/src/app/src

EXPOSE 12010
CMD [ "npm", "start" ]
