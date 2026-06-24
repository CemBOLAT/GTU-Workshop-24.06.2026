import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerTools } from "./mcp/registerTools.js";
import { registerResources } from "./mcp/registerResources.js";
import { registerPrompts } from "./mcp/registerPrompts.js";
import {
  academicDatabase,
  academicRulesText,
  courseCatalog,
  promptTemplates,
  readProjectFiles
} from "./mcp/context.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;

const app = express();

function renderDashboard() {
  const resourceList = `
    <tr><td>/api/universite-yonetmeligi.txt</td><td>Yonetmelik metni</td><td>text/plain</td></tr>
    <tr><td>/api/akademisyen/{id}</td><td>Akademisyen JSON kaydi</td><td>application/json</td></tr>
    <tr><td>/dersler/{ders_kodu}/mufredat</td><td>Ders müfredatı (template)</td><td>application/json</td></tr>
  `;

  return `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>GTU Akademik MCP Demo</title>
    <style>
      body{font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial;color:#dbe6ff;background:#071126;padding:24px}
      .shell{max-width:1100px;margin:0 auto}
      .hero{display:grid;grid-template-columns:1fr 320px;gap:18px}
      .panel{background:rgba(255,255,255,0.02);padding:18px;border-radius:12px}
      a{color:#9fe3ff}
      table{width:100%;border-collapse:collapse}
      th,td{padding:8px;border-bottom:1px solid rgba(255,255,255,0.04);text-align:left}
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <div class="panel">
          <h1>GTU Akademik MCP sunucusu</h1>
          <p>Demo: Tools, Resources, Resource Templates ve Prompts örnekleri.</p>
          <p>Port: ${PORT}</p>
        </div>
        <aside class="panel">
          <h3>Hizli linkler</h3>
          <div><a href="/api/universite-yonetmeligi.txt">/api/universite-yonetmeligi.txt</a></div>
          <div><a href="/api/akademisyen/prof_dr_ayse_yilmaz">/api/akademisyen/prof_dr_ayse_yilmaz</a></div>
          <div><a href="/dersler/AI_101/mufredat">/dersler/AI_101/mufredat</a></div>
        </aside>
      </section>

      <section style="margin-top:20px" class="panel">
        <h2>Yayınlanan HTTP yüzeyi</h2>
        <table>
          <thead><tr><th>Route</th><th>Açıklama</th><th>Format</th></tr></thead>
          <tbody>${resourceList}</tbody>
        </table>
      </section>
    </main>
  </body>
  </html>`;
}

// Create MCP server and register modules
const mcpServer = new McpServer({ name: "gtu-akademik-mcp", version: "1.0.0" }, { capabilities: { tools: {}, resources: {}, prompts: {} } });
await registerTools(mcpServer);
await registerResources(mcpServer);
await registerPrompts(mcpServer);

app.get("/", (_req, res) => res.type("html").send(renderDashboard()));

app.get("/api/status", (_req, res) => {
  res.json({ ok: true, name: "gtu-akademik-mcp", port: PORT, tools: ["localhost_hoca_verisi_cek", "odev_format_raporu_olustur"], resources: ["universite-yonetmeligi", "akademisyen-verisi", "ders-mufredatlari"], prompts: ["akademik_tesvik_analizi", "tez_dosya_kontrolu"] });
});

app.get("/api/mcp-meta", (_req, res) => {
  res.json({ tools: [ { name: "localhost_hoca_verisi_cek", description: "Akademisyen verisini ID ile getirir." }, { name: "odev_format_raporu_olustur", description: "OgrenciIsleri/OgrenciOdevleri klasorundeki PDF olmayan dosyalari listeler." } ], resources: [ { uri: "http://localhost:3000/api/universite-yonetmeligi.txt", description: "Salt-okunur yonetmelik metni" }, { uriTemplate: "http://localhost:3000/dersler/{ders_kodu}/mufredat", description: "Ders müfredati sablonu" } ], prompts: Object.fromEntries(Object.entries(promptTemplates).map(([key, value]) => [key, value])) });
});

app.get("/api/akademisyen/:id", (req, res) => {
  const hoca = academicDatabase[req.params.id];
  if (!hoca) return res.status(404).json({ hata: "Hoca bulunamadi" });
  res.json(hoca);
});

app.get("/api/universite-yonetmeligi.txt", (_req, res) => res.type("text/plain").send(academicRulesText));

app.get("/dersler/:ders_kodu/mufredat", (req, res) => {
  const normalizedKey = req.params.ders_kodu.replace(/-/g, "_").toUpperCase();
  const course = courseCatalog[normalizedKey];
  if (!course) return res.status(404).json({ hata: "Ders bulunamadi" });
  res.json(course);
});

app.get("/api/prompts/:name", (req, res) => {
  const prompt = promptTemplates[req.params.name];
  if (!prompt) return res.status(404).json({ hata: "Prompt bulunamadi" });
  res.json(prompt);
});

app.get("/api/project-file-report", async (_req, res) => {
  try {
    const baseDir = path.resolve(__dirname, "..", "Öğrenciİşleri", "OgrenciOdevleri");
    const report = await readProjectFiles(baseDir);
    res.json({ baseDir, report });
  } catch (error) {
    res.status(500).json({ hata: error instanceof Error ? error.message : String(error) });
  }
});

app.listen(PORT, () => console.error(`GTU Akademik MCP sunucusu hazir: http://localhost:${PORT}`));

const transport = new StdioServerTransport();
await mcpServer.connect(transport);

process.on("SIGINT", async () => {
  await mcpServer.close();
  process.exit(0);
});
