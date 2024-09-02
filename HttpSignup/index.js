const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        // Serve the index.html form
        const filePath = path.resolve(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end("Server error");
            } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(data);
            }
        });
    } else if (req.url === "/signup" && req.method === "POST") {
        let body = "";

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const parsedData = parse(body);
            const { username, pass } = parsedData;
            const userData = `Username: ${username}, Password: ${pass}\n`;

            // Append the user data to user.txt
            fs.appendFile("user.txt", userData, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "text/plain");
                    res.end("Error saving data");
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/plain");
                    res.end("Thank You for Signing Up...!!!");
                }
            });
        });
    } else if (req.url === "/allusers" && req.method === "GET") {
        const filePath = path.resolve(__dirname, "user.txt");
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end("Server error");
            } else {
                // Remove passwords from data
                const anonymizedData = data.replace(/Password: .*\n/g, 'Password: [REDACTED]\n');
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/plain");
                res.end(anonymizedData);
            }
        });
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Page not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
