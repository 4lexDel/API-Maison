FROM node:19.7-slim

WORKDIR /app
COPY . .
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

# COPY ./entrypoint.sh .
# RUN chmod +x entrypoint.sh
CMD ["npm", "run", "start"]
# ENTRYPOINT ["./entrypoint.sh"]
