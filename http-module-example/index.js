const http = require("http");

const getPage = (res,url) => {
    url = url === "/" ? "home" : url.substr(1);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h2>welcome to ${url} page.</h2>`);
}

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === "/" || url === "/about" || url === "/contact" ) {
        getPage(res,url);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>Error 404</h1>");
    }

    res.end();
});

const port = 5000;

server.listen(port, () => {
    console.log(`Server started.`);
});