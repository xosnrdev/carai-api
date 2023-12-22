# Use a specific version of node 18 Alpine for predictability
FROM node:18-alpine AS builder-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only the packages defined in the package-lock.json (faster, more reliable builds)
RUN npm ci development

# Copy the rest of the source code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Start a new stage from node 18 Alpine to keep the image size small
FROM node:18-alpine

RUN addgroup app && adduser -S -G app app

USER app

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm ci production

# Copy compiled js from the builder-stage stage
COPY --from=builder-stage /app/dist ./dist

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define command to run the app using the compiled code
CMD ["npm", "start"]