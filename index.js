const ws = require("ws");
const server = new ws.Server({ port: 3000, host: "0.0.0.0" });

// server.on("connection", (socket) => {
//   socket.on("message", (message) => {
//     const buf = Buffer.from(message);
//     console.log(buf.toString());
//     socket.send(`${message}`);
//   });
// });

server.on("connection", (socket, request) => {
  // Obtain the IP address from the request object
  const clientIpAddress =
    request.headers["x-forwarded-for"] || request.socket.remoteAddress;

  console.log(`Client connected from IP address:- ${clientIpAddress}`);

  socket.on("message", (message) => {
    const buf = Buffer.from(message);
    console.log(buf.toString());

    // Send a response to the client
    socket.send(`${message}`);
  });
});
