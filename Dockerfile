# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Expose port 7000
EXPOSE 7000

# Start the application in development mode
CMD ["npm", "run", "dev"]
