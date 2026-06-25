import { z } from "zod";

export function registerTezDosyaKontrolPrompt(mcpServer) {
  mcpServer.registerPrompt(
    "tez_dosya_kontrolu",
    { title: "Tez Dosyası Kontrolü", description: "Teslim klasorunu kontrol etmeye yönelik hazır prompt.", argsSchema: { ogrenci_adi: z.string() } },
    async ({ ogrenci_adi }) => ({ description: "Tez dosyasi denetim promptu", messages: [{ role: "user", content: { type: "text", text: `Öğrenci ${ogrenci_adi} için teslim kontrolü yap. PDF zorunluluğu, dosya adı standardı ve kaynakça formatını denetle.` } }] })
  );
}
