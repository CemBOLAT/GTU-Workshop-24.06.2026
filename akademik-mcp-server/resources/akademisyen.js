import { academicDatabase } from "../shared/context.js";

export function registerAkademisyenResource(mcpServer) {
  mcpServer.registerResource(
    "akademisyen-verisi",
    "http://localhost:3000/api/akademisyenler.json",
    { title: "Akademisyen Veri Kumesi", description: "Canli akademisyen kayitlari.", mimeType: "application/json" },
    async () => ({ contents: [{ uri: "http://localhost:3000/api/akademisyenler.json", mimeType: "application/json", text: JSON.stringify(academicDatabase, null, 2) }] })
  );
}
