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
  prof_dr_selim_karaca: {
    unvan: "Prof. Dr.",
    ad: "Selim Karaca",
    yayinSayisi: 55,
    atifSayisi: 1680,
    alan: "Bilgisayarla Görü"
  },
  prof_dr_esra_tunc: {
    unvan: "Prof. Dr.",
    ad: "Esra Tunç",
    yayinSayisi: 37,
    atifSayisi: 970,
    alan: "Doğal Dil İşleme"
  },
  doc_dr_mehmet_demir: {
    unvan: "Doç. Dr.",
    ad: "Mehmet Demir",
    yayinSayisi: 18,
    atifSayisi: 340,
    alan: "Siber Güvenlik"
  },
  doc_dr_seda_ozkan: {
    unvan: "Doç. Dr.",
    ad: "Seda Özkan",
    yayinSayisi: 24,
    atifSayisi: 420,
    alan: "Dağıtık Sistemler"
  },
  doc_dr_murat_erdin: {
    unvan: "Doç. Dr.",
    ad: "Murat Erdin",
    yayinSayisi: 21,
    atifSayisi: 315,
    alan: "Yazılım Mühendisliği"
  },
  dr_ali_kaya: {
    unvan: "Dr. Öğr. Üyesi",
    ad: "Ali Kaya",
    yayinSayisi: 8,
    atifSayisi: 45,
    alan: "Veri Bilimi"
  },
  dr_zeynep_arslan: {
    unvan: "Dr. Öğr. Üyesi",
    ad: "Zeynep Arslan",
    yayinSayisi: 12,
    atifSayisi: 110,
    alan: "İnsan-Bilgisayar Etkileşimi"
  },
  dr_emre_ucar: {
    unvan: "Dr. Öğr. Üyesi",
    ad: "Emre Uçar",
    yayinSayisi: 10,
    atifSayisi: 87,
    alan: "Nesnelerin İnterneti"
  },
  dr_elif_candar: {
    unvan: "Dr. Öğr. Üyesi",
    ad: "Elif Candar",
    yayinSayisi: 14,
    atifSayisi: 150,
    alan: "Bulut Bilişim"
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
