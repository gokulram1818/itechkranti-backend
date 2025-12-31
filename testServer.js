import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("RAW NODE SERVER WORKING");
});

server.listen(5050, () => {
  console.log("🔥 RAW SERVER ON 5050");
});
