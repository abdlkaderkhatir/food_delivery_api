# Use the official Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000 (or your desired port)
EXPOSE 3333

# Command to run the application
CMD ["npm", "start"]
