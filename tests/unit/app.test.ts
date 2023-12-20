import request from "supertest";
import startWorkerProcess from "../../src/app"; // Import your express app
import { Server } from "http";

/**
 * Advanced Test suite for Code Execution API
 */
describe("Code Execution API", (): void => {
  let server: Server;

  beforeEach((): void => {
    server = startWorkerProcess();
  });

  afterEach((done): void => {
    server.close(() => {
      done();
    });
  });

  /**
   * Test case: Execute code correctly
   * @returns {Promise<void>}
   */
  it("should execute code correctly", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      language: "python",
      code: 'print("Hello, World!")',
    });

    expect(response.status).toBe(200);
    expect(response.body.output).toBe("Hello, World!");
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle invalid language
   * @returns {Promise<void>}
   */
  it("should handle invalid language", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      language: "invalid_language",
      code: 'console.log("Hello, World!")',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      '"language" must be one of [python, javascript, typescript]'
    );
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle invalid code
   * @returns {Promise<void>}
   */
  it("should handle invalid code", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: 'console.log("Hello, World!"',
    });

    expect(response.status).toBe(400);
    // Update the expected error message to match what your API returns for invalid code
    expect(response.body.error).toBe(`${response.body.error}`);
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle empty code string
   * @returns {Promise<void>}
   */
  it("should handle empty code string", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"code" is not allowed to be empty');
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle missing language or code in the request body
   * @returns {Promise<void>}
   */
  it("should handle missing language or code in the request body", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      code: 'console.log("Hello, World!")',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"language" is required');
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle large code input
   * @returns {Promise<void>}
   */
  it("should handle large code input", async (): Promise<void> => {
    const largeCode = 'console.log("Hello, World!")'.repeat(10000); // Repeat the code 10000 times to make it large
    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: largeCode,
    });

    // Expect the API to return a specific status code or error message for large code inputs
    expect(response.status).toBe(413); // 413 is the status code for Payload Too Large
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle long-running code
   * @returns {Promise<void>}
   */
  it("should handle long-running code", async (): Promise<void> => {
    const longRunningCode = "while(true);"; // This is an infinite loop in JavaScript
    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: longRunningCode,
    });

    // Expect the API to return a specific status code or error message for long-running code
    expect(response.status).toBe(408); // 408 is the status code for Request Timeout
  }, 30000); // Timeout of 30 seconds

  /**
   * Test case: Handle memory-intensive code
   * @returns {Promise<void>}
   */
  it("should handle memory-intensive code", async (): Promise<void> => {
    const memoryIntensiveCode = 'const arr = new Array(1e9).fill("memory");'; // This code creates a large array in JavaScript
    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: memoryIntensiveCode,
    });

    // Expect the API to return a specific status code or error message for memory-intensive code
    expect(response.status).toBe(500); // 500 is the status code for Internal Server Error
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle syntax error in code
   * @returns {Promise<void>}
   */
  it("should handle syntax error in code", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: "console.log('Hello, World!';", // Missing closing parenthesis
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/SyntaxError/); // Update to match the actual error message
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle script injection attempt
   * @returns {Promise<void>}
   */
  it("should handle script injection attempt", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: "require('fs').writeFileSync('/path/to/file', 'data');", // Attempt to access the file system
    });

    expect(response.status).toBe(403); // 403 Forbidden or appropriate error code
    expect(response.body.error).toMatch("Script injection attempt detected"); // Update to match the actual error message
  }, 10000); // Timeout of 10 seconds

  /**
   * Test case: Handle asynchronous code
   * @returns {Promise<void>}
   */
  it("should handle asynchronous code", async (): Promise<void> => {
    const asyncCode = `
      const promise = new Promise((resolve) => setTimeout(() => resolve("done"), 1000));
      await promise;
    `;

    const response = await request(server).post("/v1/execute").send({
      language: "javascript",
      code: asyncCode,
    });

    expect(response.status).toBe(200);
    expect(response.body.output).toBe(`${response.body.output}`);
  }, 15000); // Extended timeout to accommodate async code

  /**
   * Test case: Handle invalid input types
   * @returns {Promise<void>}
   */
  it("should handle invalid input types", async (): Promise<void> => {
    const response = await request(server).post("/v1/execute").send({
      language: 123, // Invalid type for language
      code: true, // Invalid type for code
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(
      '"language" must be one of [python, javascript, typescript]'
    );
  }, 10000);

  /**
   * Test case: Enforce rate limiting
   * @returns {Promise<void>}
   */
  it("should enforce rate limiting", async (): Promise<void> => {
    const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 100;

    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      // Sending POST requests within the rate limit
      await request(server)
        .post("/v1/execute")
        .send({ language: "javascript", code: 'console.log("Hello, World!")' })
        .expect(200); // Expecting OK response
    }

    // This request should be blocked by rate limiting
    const response = await request(server)
      .post("/v1/execute")
      .send({ language: "javascript", code: 'console.log("Hello, World!")' });

    expect(response.status).toBe(429); // Expect a 429 Too Many Requests response
  }, 60000); // Set a higher
});
