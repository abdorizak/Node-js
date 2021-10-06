const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("hellow world");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
    res.end();
  }
});
const port = 3000;
server.listen(port);

console.log(`listening on port:${port}`);
