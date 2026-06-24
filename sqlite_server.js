import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import sqlite3 from "sqlite3";
import path from "path";

// Veritabanı bağlantısı
const dbPath = path.resolve("Öğrenciİşleri/akademik_kayitlar.db");
const db = new sqlite3.Database(dbPath);

const server = new Server(
  { name: "gtu-local-sqlite-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Aracı tanımlıyoruz
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "execute_sql",
        description: "SQLite veritabanı üzerinde SQL sorguları (CREATE, INSERT, SELECT) çalıştırır.",
        inputSchema: {
          type: "object",
          properties: {
            sql: { type: "string", description: "Çalıştırılacak saf SQL sorgusu" }
          },
          required: ["sql"]
        }
      }
    ]
  };
});

// Ajan aracı tetiklediğinde çalışacak kısım
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "execute_sql") {
    const sql = request.params.arguments.sql;
    
    return new Promise((resolve) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          resolve({ content: [{ type: "text", text: `Hata: ${err.message}` }], isError: true });
        } else {
          resolve({ content: [{ type: "text", text: JSON.stringify(rows || { success: true }) }] });
        }
      });
    });
  }
  throw new Error("Araç bulunamadı");
});

const transport = new StdioServerTransport();
await server.connect(transport);