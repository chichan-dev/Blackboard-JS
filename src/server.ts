import http from "http";
import { Server } from "socket.io";
import { createApp } from "./app";
import { registerSockets } from "./sockets";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = createApp();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true, // para dev; en prod usa allowlist
    credentials: true
  }
});

registerSockets(io);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
