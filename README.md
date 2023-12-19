# Code Execution Engine API

This project provides an API for executing code in different programming languages. It uses Docker to isolate the code execution environment.

## Features

- Supports Python, JavaScript, and TypeScript.
- Uses Docker for secure and isolated code execution.
- Handles different types of code: valid, invalid, empty, missing, large, long-running, memory-intensive, and asynchronous.
- Includes rate limiting to prevent abuse.
- Uses Helmet for enhanced security.
- Comprehensive test suite for different types of code.

## API

### POST /v1/execute

Executes the provided code.

#### Parameters

- `language`: The programming language of the code. Must be one of 'python', 'javascript', 'typescript'.
- `code`: The code to be executed.

#### Response

- `message`: A message indicating the status of the code execution.
- `output`: The output of the code execution.
- `error`: Any errors that occurred during the code execution.

## Setup

1. Install Docker on your machine.
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the server.

## Testing

The project includes a comprehensive test suite with test cases for different types of code. To run the tests, use the command `npm test`.

## License

This project is licensed under the MIT License.
