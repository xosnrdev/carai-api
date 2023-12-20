# Stage 1: Node.js
FROM node:18-slim AS node_base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set registry http://registry.npmjs.org/ && npm ci
COPY . .

# Stage 2: Python
FROM python:3.8-slim
WORKDIR /usr/src/app
COPY --from=node_base /usr/src/app .

# Install necessary packages and clear cache in one layer
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/* && \
    curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-20.10.7.tgz && \
    tar xzvf docker-20.10.7.tgz --strip 1 -C /usr/local/bin docker/docker && \
    rm docker-20.10.7.tgz

# Expose port 3000
EXPOSE 3000

# Create a non-root user and switch to it for security
RUN useradd -m appuser
USER appuser
