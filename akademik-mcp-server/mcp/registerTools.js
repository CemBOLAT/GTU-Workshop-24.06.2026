import { z } from "zod";
import path from "path";
import { academicDatabase, readProjectFiles, formatAsTable } from "./context.js";

export async function registerTools(mcpServer) {
  mcpServer.registerTool(
    "localhost_hoca_verisi_cek",
    {
      title: "Hoca Verisi Çek",
      description: "Akademisyen verisini ID ile getirir.",
      inputSchema: z.object({ hoca_id: z.string().min(1) })
    },
    async ({ hoca_id }) => {
      const hoca = academicDatabase[hoca_id];

      if (!hoca) {
        return { content: [{ type: "text", text: `Hata: ${hoca_id} icin akademisyen bulunamadi.` }], isError: true };
      }

      return { content: [{ type: "text", text: JSON.stringify(hoca, null, 2) }] };
    }
  );

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
