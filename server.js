const WebSocket = require("ws");
const port = process.env.PORT || 3000;
const server = new WebSocket.Server({ port });

server.on("connection", socket => {
  console.log("Cliente conectado");

  socket.on("message", raw => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    if (msg.cmd === "handshake") {
      socket.send(JSON.stringify({
        cmd: "handshake",
        val: {
          status: "ok",
          motd: "Bienvenido a CloudLink V4",
          version: "0.2.0"
        }
      }));
      console.log("Handshake respondido");
    } else {
      // eco de cualquier otro mensaje
      server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(raw);
        }
      });
    }
  });
});

console.log("Servidor WS iniciado en puerto", port);
