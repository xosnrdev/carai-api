#!/bin/sh

# Constants
S3_ENV_FILE="s3://carai-api-657214731516/variables.env"
LOCAL_ENV_FILE="/app/.env"
MAX_RETRIES=5

# Function to log messages with a timestamp
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Function to fetch environment variables file from S3 with retries
fetch_env_from_s3() {
  attempt=0
  until [ "$attempt" -ge "$MAX_RETRIES" ]; do
    log "Attempting to fetch environment variables from S3 ($attempt/$MAX_RETRIES)"
    if aws s3 cp "$S3_ENV_FILE" "$LOCAL_ENV_FILE"; then
      log "Successfully fetched the environment variables."
      return 0
    fi
    attempt=$((attempt + 1))
    sleep 10
  done

  log "Failed to fetch environment variables after $MAX_RETRIES attempts."
  return 1
}

# Main execution starts
log "Starting entry point script."

# Fetch environment variables
if ! fetch_env_from_s3; then
  log "Exiting due to failure in fetching environment variables."
  exit 1
fi

# Source the variables to the current environment
if [ -f "$LOCAL_ENV_FILE" ]; then
  log "Sourcing environment variables."
  . "$LOCAL_ENV_FILE"
else
  log "Environment file not found."
  exit 1
fi

# Execute the main process of the container
log "Executing the main process."
exec npm start
