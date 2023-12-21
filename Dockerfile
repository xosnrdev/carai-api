# Use the official Node.js 18
FROM node:18

# Set the working directory
WORKDIR /app

# Install Python 3.8
RUN apk add --no-cache python3 py3-pip


# Install jq
RUN apk add --no-cache jq


# Copy package.json and package-lock.json (if available) to Docker container
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Transpile the TypeScript code
RUN npx tsc

# Remove devDependencies from package.json
RUN jq 'del(.devDependencies)' package.json > package.tmp.json && mv package.tmp.json package.json

# Remove devDependencies
RUN npm prune --production

# Remove the 'src' and 'test' directories as they're not needed for production
RUN rm -rf ./src ./tests ./tsconfig.json

# Create a group named "carai-server" and a user named "xosnrdev"
RUN addgroup -S carai-server && adduser -S xosnrdev -G carai-server

# Change ownership of the /app directory to xosnrdev:carai-server
RUN chown -R xosnrdev:carai-server /app

# Switch to non-root user xosnrdev
USER xosnrdev

# Set the environment to production
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]