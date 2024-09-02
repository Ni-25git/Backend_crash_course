const http = require('http');
const path = require("path");
const fs = require("fs")
const PORT = 8080;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Welcome to Home Page");
    } else if (req.url === "/aboutus") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end("<h3>Welcome to About Page</h3>");
    } else if(req.url==="/contactus"){
        res.statusCode=200;
        res.setHeader("Content-Type", "text/html");
        res.end(`
            <a href="https://www.masaischool.com/" target="_blank">Contact us </a>
            `)
    } else if(req.url==="/index"){
        
        const filePath = path.resolve(__dirname,'index.js');

        fs.readFile(filePath, (err,data)=>{
            if(err){
                res.statusCode = 500;
                res.setHeader("Content-Type", "text/plain");
                res.end("Server error");
            }else{
                res.statusCode=200;
                res.setHeader("Content-Type", "text/javascript");
                res.end(data)
            }
        })

    } else {
        // If the URL doesn't match any known routes, respond with a 404 (Not Found)
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Page Not Found");
    }
});

// Start the server on port 8080
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
