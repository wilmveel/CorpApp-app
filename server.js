var connect = require('connect');
connect.createServer(
    connect.static("www")
).listen(8080);
console.log("server started at localhost:8080");