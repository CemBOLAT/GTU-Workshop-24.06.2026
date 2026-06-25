import { z } from "zod";

export function registerTesvikAnaliziPrompt(mcpServer) {
  mcpServer.registerPrompt(
    "akademik_tesvik_analizi",
    { title: "Akademik Teşvik Analizi", description: "Hocanin yayin/atif durumunu ozetleyen hazir prompt.", argsSchema: { hoca_adi: z.string() } },
    async ({ hoca_adi }) => ({ description: "Teşvik analizi promptu", messages: [{ role: "user", content: { type: "text", text: `Akademik teşvik analizi yap. Hoca: ${hoca_adi}. Yayın sayısı, atıf sayısı ve çalışma alanını kısa bir raporda özetle.` } }] })
  );
}
