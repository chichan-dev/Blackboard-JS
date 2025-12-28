import express from "express";
import path from "path";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  // Static client
  const publicDir = path.join(process.cwd(), "public");
  app.use(express.static(publicDir));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  return app;
}
