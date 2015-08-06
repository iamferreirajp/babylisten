var http = require("http"),
    url = require("url");
 
function start() {
    var onRequest = function (request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
 
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello World");
        response.end();
    };
 
    http.createServer(onRequest).listen([666]);
    console.log("node.js server has started");
}
exports.start = start;