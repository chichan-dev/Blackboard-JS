import type { Server } from "socket.io";
import { z } from "zod";
import type { ClientToServerEvents, ServerToClientEvents, Segment } from "./types";

const pointSchema = z.object({ x: z.number(), y: z.number() });
const segmentSchema = z.tuple([pointSchema, pointSchema]);

const MAX_HISTORY = 10_000;
const history: Segment[] = [];

function pushHistory(seg: Segment) {
  history.push(seg);
  if (history.length > MAX_HISTORY) history.splice(0, history.length - MAX_HISTORY);
}

export function registerSockets(io: Server<ClientToServerEvents, ServerToClientEvents>) {
  io.on("connection", (socket) => {
    for (const seg of history) {
      socket.emit("draw_line", { line: seg });
    }

    socket.on("room_join", ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("draw_line", (data) => {
      const parsed = z.object({ line: segmentSchema }).safeParse(data);
      if (!parsed.success) return;

      pushHistory(parsed.data.line);
      socket.broadcast.emit("draw_line", { line: parsed.data.line });
    });

    socket.on("board_clear", () => {
      history.length = 0;
      socket.broadcast.emit("board_cleared");
    });
  });
}
