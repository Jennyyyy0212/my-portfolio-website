# Build stage
FROM node:18 as build

# Development React server
FROM node:18

WORKDIR /app
COPY . .
RUN npm install

# Run the React development server (with hot reload)
CMD ["npm", "start"]