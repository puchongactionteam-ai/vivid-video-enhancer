import http from "node:http";
import { createReadStream, createWriteStream, existsSync, mkdirSync, statSync } from "node:fs";
import { pipeline } from "node:stream/promises";
import { basename, extname, join } from "node:path";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";

const root = process.cwd();
const site = join(root, "docs");
const workspace = join(root, "local-work");
const output = join(root, "local-output");
for (const dir of [workspace, output]) if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

function send(res, status, body, type = "application/json") { res.writeHead(status, { "content-type": type }); res.end(body); }
function run(args) { return new Promise((resolve, reject) => { const process = spawn("ffmpeg", args, { windowsHide: true }); let error = ""; process.stderr.on("data", c => error += c); process.on("close", code => code === 0 ? resolve() : reject(new Error(error.slice(-1200)))); }); }
function serveFile(res, file) { if (!existsSync(file)) return send(res, 404, "Not found", "text/plain"); const ext = extname(file); const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".mp4": "video/mp4" }; res.writeHead(200, { "content-type": types[ext] || "application/octet-stream", "content-length": statSync(file).size }); createReadStream(file).pipe(res); }

const port = Number(process.env.PORT || 4173);
http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && url.pathname === "/") return serveFile(res, join(site, "index.html"));
  if (req.method === "GET" && url.pathname.startsWith("/downloads/")) return serveFile(res, join(output, basename(url.pathname)));
  if (req.method !== "POST" || url.pathname !== "/api/enhance") return send(res, 404, "Not found", "text/plain");
  if (Number(req.headers["content-length"] || 0) > 2 * 1024 * 1024 * 1024) return send(res, 413, JSON.stringify({ error: "Maximum upload size is 2 GB." }));
  const filename = basename(decodeURIComponent(req.headers["x-file-name"] || "video.mp4"));
  if (extname(filename).toLowerCase() !== ".mp4") return send(res, 400, JSON.stringify({ error: "Please upload an MP4 file." }));
  const target = url.searchParams.get("quality") === "720p HD" ? "1280:720" : url.searchParams.get("quality") === "4K Ultra HD" ? "3840:2160" : "1920:1080";
  const id = randomUUID(); const input = join(workspace, `${id}-input.mp4`); const result = join(output, `${basename(filename, ".mp4")}-${target.replace(":", "x")}-enhanced-${id.slice(0, 8)}.mp4`);
  try {
    await pipeline(req, createWriteStream(input));
    try { await run(["-y", "-hwaccel", "cuda", "-hwaccel_output_format", "cuda", "-i", input, "-vf", `scale_cuda=${target}`, "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "23", "-c:a", "copy", result]); }
    catch { await run(["-y", "-i", input, "-vf", `scale=${target}:flags=lanczos`, "-c:v", "h264_nvenc", "-preset", "p4", "-cq", "23", "-c:a", "copy", result]); }
    send(res, 200, JSON.stringify({ download: `/downloads/${encodeURIComponent(basename(result))}`, filename: basename(result) }));
  } catch (error) { send(res, 500, JSON.stringify({ error: "Video processing failed. Check that the input is a valid MP4 and try again." })); }
}).listen(port, "127.0.0.1", () => console.log(`Vivid local server: http://127.0.0.1:${port}`));
