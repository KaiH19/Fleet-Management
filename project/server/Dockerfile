# server/Dockerfile
FROM node:18

WORKDIR /app

# Copy package info first for caching
COPY package*.json ./
RUN npm install

# Then copy the rest of the source
COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]

