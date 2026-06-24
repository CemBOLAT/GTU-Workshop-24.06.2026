import { z } from "zod";
import { promptTemplates } from "./context.js";

export async function registerPrompts(mcpServer) {
  mcpServer.registerPrompt(
    "akademik_tesvik_analizi",
    { title: "Akademik Teşvik Analizi", description: "Hocanin yayin/atif durumunu ozetleyen hazir prompt.", argsSchema: { hoca_adi: z.string() } },
    async ({ hoca_adi }) => ({ description: "Teşvik analizi promptu", messages: [{ role: "user", content: { type: "text", text: `Akademik teşvik analizi yap. Hoca: ${hoca_adi}. Yayın sayısı, atıf sayısı ve çalışma alanını kısa bir raporda özetle.` } }] })
  );

  mcpServer.registerPrompt(
    "tez_dosya_kontrolu",
    { title: "Tez Dosyası Kontrolü", description: "Teslim klasorunu kontrol etmeye yönelik hazır prompt.", argsSchema: { ogrenci_adi: z.string() } },
    async ({ ogrenci_adi }) => ({ description: "Tez dosyasi denetim promptu", messages: [{ role: "user", content: { type: "text", text: `Öğrenci ${ogrenci_adi} için teslim kontrolü yap. PDF zorunluluğu, dosya adı standardı ve kaynakça formatını denetle.` } }] })
  );

  // Optionally expose metadata derived from promptTemplates
  Object.entries(promptTemplates).forEach(([key, val]) => {
    // ensure prompt is registered; metadata available via /api/mcp-meta
  });
}
