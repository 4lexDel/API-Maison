FROM node:19.7-slim

WORKDIR /app
COPY . .
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
ENTRYPOINT ["./entrypoint.sh"]
