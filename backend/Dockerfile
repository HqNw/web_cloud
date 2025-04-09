FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

EXPOSE 5000

CMD ["npm", "start"]