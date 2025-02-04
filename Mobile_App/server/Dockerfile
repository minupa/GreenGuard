# filepath: /c:/GreenGuard/GG_MobileApp/Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the server directory
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the server directory
COPY server/ .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]