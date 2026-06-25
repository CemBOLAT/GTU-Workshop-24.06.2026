import { z } from "zod";
import path from "path";
import { readProjectFiles, formatAsTable } from "../shared/context.js";

export function registerOdevRaporuTool(mcpServer) {
  mcpServer.registerTool(
    "odev_format_raporu_olustur",
    {
      title: "Odev Format Raporu Olustur",
      description: "Ogrenciİşleri/OgrenciOdevleri klasorundeki PDF olmayan dosyalari listeler.",
      inputSchema: z.object({ klasor: z.string().optional() })
    },
    async ({ klasor }) => {
      try {
        const base = klasor || path.resolve(process.cwd(), "Öğrenciİşleri", "OgrenciOdevleri");
        const findings = await readProjectFiles(base);
        const rows = findings.map((item) => [item.student, item.fileName, item.reason]);
        const text = rows.length ? formatAsTable(rows, ["Ogrenci", "Dosya", "Durum"]) : "PDF disi dosya bulunamadi.";
        return { content: [{ type: "text", text }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Klasor okunamadi: ${error instanceof Error ? error.message : String(error)}` }], isError: true };
      }
    }
  );
}
