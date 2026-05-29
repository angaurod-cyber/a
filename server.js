const WebSocket = require("ws");
const server = new WebSocket.Server({ port: process.env.PORT || 3000 });

server.on("connection", socket => {
  socket.on("message", msg => {
    console.log("Mensaje recibido:", msg);
    // reenviar a todos los clientes conectados
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});
