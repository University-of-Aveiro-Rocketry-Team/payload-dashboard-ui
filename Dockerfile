# Stage 1: Build the application using Node

# Use an official Node runtime as a parent image
FROM node:latest as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle the source code inside the Docker image
COPY . .

# Copy the .env file from deploy folder to the container's working directory
COPY deploy/.env .env

# Build the application (assuming you have a build script in package.json)
RUN yarn build

# Stage 2: Serve the built application using Nginx

# Use an official Nginx runtime as a parent image for the serving stage
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container launches
# Nginx will automatically start and serve the files in /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
