# Dockerfile for Express Backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Start the server (this will be overridden by Docker Compose)
CMD ["npm", "start"]
