import { Request, Response } from "express";

const getWelcomeMessage = (req: Request, res: Response): void => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome - API Service</title>
        <style>
            body {
                background-color: #0f0f0f; /* Dark background */
                color: #33ff33; /* Bright green text */
                font-family: 'Courier New', Courier, monospace; /* Monospace font */
                margin: 0;
                padding: 20px;
                line-height: 1.6;
            }
            h1 {
                color: #33ff33;
            }
            p, a {
                color: #33ff33;
            }
            a {
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
            .container {
                max-width: 800px;
                margin: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Carai API Service</h1>
            <p>This service provides an interface for code execution and health status monitoring. Please refer to the documentation for detailed usage instructions.</p>
            <p>Hit the <a href="/health">/health</a> endpoint for health status.</p>
            <p>Use POST <code>/api/execute</code> to run code.</p>
        </div>
    </body>
    </html>
    `;

  res.header("Content-Type", "text/html");
  res.send(htmlContent);
};

export default getWelcomeMessage;
