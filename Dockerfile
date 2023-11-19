# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle the source code inside the Docker image
COPY . .

# Make port 3030 available to the world outside this container
EXPOSE 3030

# Run the app when the container launches
CMD ["yarn", "dev"]
