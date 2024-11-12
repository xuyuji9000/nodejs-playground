const http = require('http');



http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Worker ${process.pid}\n`);
    console.log(process.env.PORT)
}).listen(process.env.PORT);
