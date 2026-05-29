const WebSocket = require("ws");
const port = process.env.PORT || 3000;
const server = new WebSocket.Server({ port });

server.on("connection", socket => {
  console.log("Cliente conectado");
  socket.on("message", msg => {
    console.log("Mensaje recibido:", msg);
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

console.log("Servidor WS iniciado en puerto", port);
