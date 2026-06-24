# Akademik MCP Demo

Bu dizin `akademik-mcp-server` için bağımsız bir açıklama ve kullanım rehberidir. Bu küçük demo, MCP (Model Context Protocol) kavramlarını: Tools, Resources, Resource Templates ve Prompts üzerinden somut olarak gösterir ve aynı süreçte Express ile HTTP yayın yapar.

## Nasıl Başlatılır

1. Proje dizinine girin:

```bash
cd akademik-mcp-server
npm install
npm start
```

2. Tarayıcıdan `http://localhost:3000` adresini açın.

## Yayınlanan HTTP endpointleri

- `GET /` — Dashboard
- `GET /api/status` — Sunucu statü ve kısa meta
- `GET /api/mcp-meta` — MCP meta (tools/resources/prompts)
- `GET /api/universite-yonetmeligi.txt` — Yonetmelik metni (text/plain)
- `GET /api/akademisyen/:id` — Akademisyen JSON kaydı (örnek id: `prof_dr_ayse_yilmaz`)
- `GET /dersler/:ders_kodu/mufredat` — Resource template çıktısı (örn. `AI_101`)
- `GET /api/project-file-report` — `Öğrenciİşleri/OgrenciOdevleri` içeriğini tarar ve PDF dışı dosyaları raporlar

## Kayıtlı MCP Yetkinlikleri

### Tools
- `localhost_hoca_verisi_cek(hoca_id)` — Akademisyen verisini döner.
- `odev_format_raporu_olustur(klasor?)` — Öğrenci ödev klasörünü tarar, PDF olmayan dosyaları listeler.

### Resources
- `universite-yonetmeligi` — `/api/universite-yonetmeligi.txt` (text/plain)
- `akademisyen-verisi` — `/api/akademisyenler.json` (application/json)

### Resource Templates
- `http://localhost:3000/dersler/{ders_kodu}/mufredat` — Dinamik ders müfredatları için template

### Prompts (sunucu tarafı hazır şablonlar)
- `akademik_tesvik_analizi(hoca_adi)` — Hoca için kısa teşvik/yayın özeti üretir.
- `tez_dosya_kontrolu(ogrenci_adi)` — Teslim dosyası kontrolleri (PDF, isimlendirme, kaynakça) için prompt.

## Örnek Kullanımlar ve Promptlar

1) Yönetmelik (curl):

```bash
curl http://localhost:3000/api/universite-yonetmeligi.txt
```

2) Akademisyen JSON (curl):

```bash
curl http://localhost:3000/api/akademisyen/prof_dr_ayse_yilmaz
```

3) Ders müfredatı (template):

```bash
curl http://localhost:3000/dersler/AI_101/mufredat
```

4) Örnek Tool çağrısı (istemci tarafından gönderilecek JSON):

```json
{
  "tool": "localhost_hoca_verisi_cek",
  "input": { "hoca_id": "prof_dr_ayse_yilmaz" }
}
```

5) Örnek Prompt: `akademik_tesvik_analizi`

```json
{
  "prompt": "akademik_tesvik_analizi",
  "args": { "hoca_adi": "Ayşe Yılmaz" }
}
```

6) Örnek Prompt: `tez_dosya_kontrolu`

```json
{
  "prompt": "tez_dosya_kontrolu",
  "args": { "ogrenci_adi": "Mustafa Ozturk" }
}
```

## Notlar

- MCP sunucusu bu demo içinde stdio tabanlı çalışır ve aynı Node.js sürecinde Express ile eş zamanlı çalışır.
- Daha gelişmiş istemci örnekleri (MCP client snippet'ı, Prompt çağırma örnekleri) isterseniz ekleyebilirim.
