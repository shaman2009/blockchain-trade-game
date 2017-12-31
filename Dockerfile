FROM daocloud.io/library/node:7

RUN npm config set registry https://registry.cnpmjs.org && npm install -g sails

WORKDIR /var/workspace
COPY package.json /var/workspace/package.json
RUN npm install && npm cache clean
COPY . /var/workspace

EXPOSE 1337
CMD ["sails", "lift"]
