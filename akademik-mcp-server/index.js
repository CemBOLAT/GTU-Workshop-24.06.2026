import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

import { registerHocaVerisiTool } from "./tools/hocaVerisi.js";
import { registerOdevRaporuTool } from "./tools/odevRaporu.js";
import { registerYonetmelikResource } from "./resources/yonetmelik.js";
import { registerAkademisyenResource } from "./resources/akademisyen.js";
import { registerMufredatResource } from "./resources/mufredat.js";
import { registerTesvikAnaliziPrompt } from "./prompts/tesvikAnalizi.js";
import { registerTezDosyaKontrolPrompt } from "./prompts/tezDosyaKontrol.js";

const PORT = 3000;
const app = express();
app.use(express.json());

const mcpServer = new McpServer(
  { name: "gtu-akademik-mcp", version: "1.0.0" },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

// Register tools
registerHocaVerisiTool(mcpServer);
registerOdevRaporuTool(mcpServer);

// Register resources
registerYonetmelikResource(mcpServer);
registerAkademisyenResource(mcpServer);
registerMufredatResource(mcpServer);

// Register prompts
registerTesvikAnaliziPrompt(mcpServer);
registerTezDosyaKontrolPrompt(mcpServer);

const transports = new Map();

app.get("/sse", async (req, res) => {
  const transport = new SSEServerTransport("/messages", res);
  const sessionId = transport.sessionId;
  console.log(`New SSE client connecting... Session ID: ${sessionId}`);
  transports.set(sessionId, transport);

  req.on("close", () => {
    console.log(`SSE client disconnected: ${sessionId}`);
    transports.delete(sessionId);
  });

  await mcpServer.connect(transport);
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId;
  console.log(`POST /messages received. Session ID: ${sessionId}, Method: ${req.body?.method}, Body: ${JSON.stringify(req.body)}`);
  const transport = transports.get(sessionId);
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send("Session not found or SSE connection not established");
  }
});

app.listen(PORT, () => {
  console.log(`GTU Akademik MCP HTTP SSE server ready at: http://localhost:${PORT}/sse`);
});

process.on("SIGINT", async () => {
  for (const transport of transports.values()) {
    await transport.close();
  }
  await mcpServer.close();
  process.exit(0);
});
