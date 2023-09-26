FROM node:19.7-slim

WORKDIR /app

COPY . .

RUN npm update

EXPOSE 5000

ENTRYPOINT [ "./entrypoint.sh" ]