import { z } from "zod";
import { academicDatabase } from "../shared/context.js";

export function registerHocaVerisiTool(mcpServer) {
  mcpServer.registerTool(
    "localhost_hoca_verisi_cek",
    {
      title: "Hoca Verisi Çek",
      description: "Akademisyen verisini ID ile getirir. Ayrica all, prof, doc filtrelerini destekler.",
      inputSchema: z.object({ hoca_id: z.string().min(1) })
    },
    async ({ hoca_id }) => {
      const normalizedId = hoca_id.trim().toLowerCase();
      const entries = Object.entries(academicDatabase);

      if (normalizedId === "all") {
        return { content: [{ type: "text", text: JSON.stringify(academicDatabase, null, 2) }] };
      }

      if (normalizedId === "prof" || normalizedId === "doc") {
        const titlePrefix = normalizedId === "prof" ? "Prof." : "Doç.";
        const filtered = Object.fromEntries(entries.filter(([, hoca]) => hoca.unvan.startsWith(titlePrefix)));

        if (Object.keys(filtered).length === 0) {
          return { content: [{ type: "text", text: `Hata: ${normalizedId} filtresi icin akademisyen bulunamadi.` }], isError: true };
        }

        return { content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }] };
      }

      const matchedEntry = entries.find(([id]) => id.toLowerCase() === normalizedId);
      if (!matchedEntry) {
        return { content: [{ type: "text", text: `Hata: ${hoca_id} icin akademisyen bulunamadi.` }], isError: true };
      }

      return { content: [{ type: "text", text: JSON.stringify(matchedEntry[1], null, 2) }] };
    }
  );
}
