

const express = require("express");

const app = express();
const PORT = 3000;

// 1. Landing page
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>EKS Application</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: #f5f7fb;
                    color: #1e293b;
                    text-align: center;
                }

                .container {
                    max-width: 900px;
                    margin: 100px auto;
                    padding: 20px;
                }

                h1 {
                    font-size: 36px;
                    margin-bottom: 12px;
                }

                .subtitle {
                    color: #64748b;
                    font-size: 17px;
                    margin-bottom: 45px;
                }

                .cards {
                    display: flex;
                    justify-content: center;
                    gap: 25px;
                    flex-wrap: wrap;
                }

                .card {
                    width: 300px;
                    padding: 30px 20px;
                    border-radius: 12px;
                    background: white;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                }

                .card h2 {
                    margin-bottom: 10px;
                }

                .card p {
                    color: #64748b;
                    margin-bottom: 25px;
                }

                .frontend {
                    background: #2563eb;
                }

                .backend {
                    background: #16a34a;
                }

                .button {
                    display: inline-block;
                    padding: 12px 25px;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>Welcome to the EKS Application!</h1>

                <p class="subtitle">
                    Application deployed on Amazon Elastic Kubernetes Service (EKS).
                </p>

                <div class="cards">

                    <div class="card">
                        <h2>Frontend Application</h2>
                        <p>Node.js Application</p>
                        <a class="button frontend" href="/frontend">
                            Open Frontend
                        </a>
                    </div>

                    <div class="card">
                        <h2>Backend Application</h2>
                        <p>Python Application</p>
                        <a class="button backend" href="/backend">
                            Open Backend
                        </a>
                    </div>

                </div>
            </div>
        </body>
        </html>
    `);
});

// 2. Existing frontend page
app.get("/frontend", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>EKS Frontend</title>
        </head>
        <body>
            <h1>Welcome to the EKS Application!</h1>
            <p>Node.js frontend is running successfully.</p>
            <button onclick="checkBackend()">Check Python Backend</button>
            <p id="result">Click the button to check the backend.</p>

            <script>
                async function checkBackend() {
                    const result = document.getElementById("result");
                    result.textContent = "Checking backend...";

                    try {
                        const response = await fetch("/api/health");
                        const data = await response.json();
                        result.textContent = "Backend status: " + data.status;
                    } catch (error) {
                        result.textContent = "Backend request failed.";
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// 3. Existing backend health-check proxy
app.get("/api/health", async (req, res) => {
    try {
        const response = await fetch(
            "http://python-backend:5000/api/health"
        );

        const data = await response.json();

        res.status(response.status).json(data);

    } catch (error) {
        console.error("Backend request failed:", error.message);

        res.status(502).json({
            status: "error",
            message: "Could not reach Python backend"
        });
    }
});

// 4. Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend running on port ${PORT}`);
});
