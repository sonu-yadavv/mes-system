# Use the official Node.js image to build the app
FROM node:16 AS build-stage

# Set the working directory for the frontend app
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire source code
COPY . .

# Expose the port your server runs on
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
