import fs from "fs/promises";
import path from "path";

export const academicDatabase = {
  prof_dr_ayse_yilmaz: {
    unvan: "Prof. Dr.",
    ad: "Ayşe Yılmaz",
    yayinSayisi: 42,
    atifSayisi: 1250,
    alan: "Yapay Zekâ"
  },
  doc_dr_mehmet_demir: {
    unvan: "Doç. Dr.",
    ad: "Mehmet Demir",
    yayinSayisi: 18,
    atifSayisi: 340,
    alan: "Siber Güvenlik"
  },
  dr_ali_kaya: {
    unvan: "Dr. Öğr. Üyesi",
    ad: "Ali Kaya",
    yayinSayisi: 8,
    atifSayisi: 45,
    alan: "Veri Bilimi"
  }
};

export const academicRulesText = [
  "GTU Akademik Yonetmelik Ozeti",
  "- Sinavlar zamaninda aciklanir.",
  "- Odev teslimleri PDF formatinda kabul edilir.",
  "- Kaynakca IEEE standardina uygun yazilmalidir.",
  "- Gec teslimlerde ders politikasi uygulanir."
].join("\n");

export const courseCatalog = {
  AI_101: {
    dersKodu: "AI-101",
    dersAdi: "Yapay Zekaya Giris",
    haftalar: ["Temel kavramlar", "Arama algoritmalari", "Bilgi temsili", "Agent mimarileri"]
  },
  MCP_201: {
    dersKodu: "MCP-201",
    dersAdi: "Model Context Protocol",
    haftalar: ["Tools", "Resources", "Resource Templates", "Prompts"]
  },
  DATA_305: {
    dersKodu: "DATA-305",
    dersAdi: "Veri Bilimi Uygulamalari",
    haftalar: ["Veri temizleme", "Analiz", "Gorsellestirme", "Raporlama"]
  }
};

export const promptTemplates = {
  akademik_tesvik_analizi: {
    title: "Akademik Teşvik Analizi",
    description: "Hocaya ait yayın ve atıf verilerini özetleyen hazır prompt.",
    arguments: [{ name: "hoca_adi", description: "Analiz edilecek hocanın adı", required: true }]
  },
  tez_dosya_kontrolu: {
    title: "Tez Dosyası Kontrolü",
    description: "Teslim klasöründeki PDF ve isimlendirme durumunu kontrol eden prompt.",
    arguments: [{ name: "ogrenci_adi", description: "Kontrol edilecek öğrenci adı", required: true }]
  }
};

export async function readProjectFiles(baseDir) {
  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const entryPath = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      const nested = await readProjectFiles(entryPath);
      results.push(...nested);
      continue;
    }

    if (!entry.name.toLowerCase().endsWith(".pdf")) {
      results.push({ student: path.basename(baseDir), fileName: entry.name, reason: "PDF degil" });
    }
  }

  return results;
}

export function formatAsTable(rows, headers) {
  const widths = headers.map((header, index) => {
    const values = rows.map((row) => String(row[index] ?? ""));
    return Math.max(header.length, ...values.map((value) => value.length));
  });

  const line = (cells) => `| ${cells.map((cell, index) => String(cell).padEnd(widths[index])).join(" | ")} |`;
  const separator = `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`;

  return [line(headers), separator, ...rows.map((row) => line(row))].join("\n");
}
