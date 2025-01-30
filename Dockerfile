# Use the official Node.js image to build the app
FROM node:16 AS build-stage

# Set the working directory for the frontend app
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire source code
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine

# Copy the built Vue.js app from the build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend app
EXPOSE 8080

# Run Nginx as the frontend server
CMD ["nginx", "-g", "daemon off;"]
