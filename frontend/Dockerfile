# Use official Node.js image as base
FROM node:16 AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application
COPY . .

# Build the frontend
RUN npm run build

# Expose the frontend port
EXPOSE 8080

# Serve the app
CMD ["npm", "run", "serve"]
