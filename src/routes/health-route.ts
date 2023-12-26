import { Request, Response } from "express";

const checkHealth = (req: Request, res: Response): void => {
  const healthStatus = {
    status: "healthy",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  const acceptsHtml = req.accepts("html");

  if (acceptsHtml) {
    const prettifiedJson = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Health Check</title>
          <style>
              body {
                  font-family: 'Courier New', Courier, monospace; /* Monospace font */
                  background-color: #0f0f0f; /* Dark background */
                  color: #33ff33; /* Bright green text */
                  margin: 40px;
                  padding: 20px;
                  border: 1px solid #333;
                  border-radius: 5px;
              }
              pre {
                  white-space: pre-wrap; /* Enables wrapping of text */
                  word-wrap: break-word;
              }
              h1 {
                  border-bottom: 2px solid #33ff33;
              }
          </style>
      </head>
      <body>
          <h1>API Health Status</h1>
          <pre>${JSON.stringify(healthStatus, null, 2)}</pre>
      </body>
      </html>
      `;
    res.header("Content-Type", "text/html").send(prettifiedJson);
  } else {
    res.status(200).json(healthStatus);
  }
};

export default checkHealth;
