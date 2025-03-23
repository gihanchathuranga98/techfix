# Use the official Node.js Alpine image
FROM node:20.16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (Change if needed)
EXPOSE 4000

# Start the application
CMD ["node", "dist/main.js"]
