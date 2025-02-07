# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install a simple HTTP server to serve static files
RUN npm install -g http-server

# Expose port 8080
EXPOSE 8080

# Command to run the HTTP server in SPA mode
CMD ["http-server", "-p", "8080", "-s"]
