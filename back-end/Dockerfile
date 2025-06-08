# Use Node.js official image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Expose backend port (change if needed)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
