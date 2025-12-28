export type Point = { x: number; y: number };

export type Segment = [Point, Point];

export interface ClientToServerEvents {
  draw_line: (data: { line: Segment }) => void;
  board_clear: () => void;
  room_join: (data: { roomId: string }) => void;
}

export interface ServerToClientEvents {
  draw_line: (data: { line: Segment }) => void;
  board_cleared: () => void;
}
