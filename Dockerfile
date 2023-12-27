# Start with Node.js 18 Alpine as your base image for the build stage
FROM node:18-alpine AS builder-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock (if available)
COPY package.json yarn.lock ./

# Install all dependencies including those needed for building
RUN yarn

# Copy TypeScript files and other necessary files for the build
COPY . .

# Compile TypeScript to JavaScript
RUN yarn run build

# Start a new stage from Node.js 18 Alpine for the final image
FROM node:18-alpine

RUN apk update && \
  apk add --no-cache python3 g++ make

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json yarn.lock ./

# Install only production dependencies for Node.js
RUN yarn --frozen-lockfile --production

# Copy the compiled JavaScript files from the builder stage
COPY --from=builder-stage /app/dist/src ./dist

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define command to run your app
CMD ["yarn", "start"]
