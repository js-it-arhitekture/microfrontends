# Use official Node.js image as the base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build all apps
RUN npm run build

# Expose port 5000 (for the shell app)
EXPOSE 5003

# Serve the applications
CMD npm run serve
