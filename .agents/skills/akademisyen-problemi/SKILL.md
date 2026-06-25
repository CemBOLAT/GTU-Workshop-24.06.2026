---
name: akademisyen-problemi
description: Akademisyenin öğrenci ödev klasörlerini tarayıp hatalı formatta teslim edilen ödevleri tespit etmesini ve e-posta taslakları hazırlamasını sağlar.
---

# Akademisyen Ödev Format Kontrolü Skilli

Bu yetenek (skill), bir akademisyenin öğrenci ödev dosyalarını tek tek kontrol etmek yerine toplu ve otomatik bir denetim yapmasını sağlar. 

## Amaç
`Öğrenciİşleri/OgrenciOdevleri` klasöründeki öğrenci alt klasörlerini taramak, PDF formatında olmayan teslimleri (örn. `.rar`, `.docx`, `.txt`) tespit etmek, bunları tablo olarak raporlamak ve hatalı teslim yapan öğrencilere gönderilecek uyarı e-postası taslaklarını otomatik hazırlamak.

## Kullanılan Araçlar (MCP Tools)
- `odev_format_raporu_olustur`: Belirtilen ödev klasörünü tarar ve PDF dışındaki dosyaları listeler.

## Adım Adım Çalışma Akışı
1. **Klasörü Tara:** `odev_format_raporu_olustur` aracını parametresiz çağırarak varsayılan `Öğrenciİşleri/OgrenciOdevleri` dizinini taratın.
2. **Raporu Analiz Et:** Gelen tablo verilerini inceleyin. Hangi öğrencinin hangi dosyayı hatalı formatta (örneğin `.rar` veya `.docx`) teslim ettiğini belirleyin.
3. **Markdown Tablosu Oluştur:** Akademisyene sunulmak üzere, hatalı teslim yapan öğrencileri, hatalı dosya isimlerini ve durum nedenlerini içeren şık bir Markdown tablosu hazırlayın.
4. **E-posta Taslakları Üret:** Her bir hatalı teslim yapan öğrenci için aşağıdaki şablona uygun bir uyarı e-postası taslağı oluşturun:
   ```text
   Kime: [ogrenci_adi]@gtu.edu.tr (Tahmini e-posta veya sadece Öğrenci Adı)
   Konu: Dönem Ödevi Format Hatası Uyarı

   Sayın [Öğrenci Adı],
   
   Teslim etmiş olduğunuz '[Dosya Adı]' isimli ödev dosyası belirlenen format kurallarına (PDF) uymamaktadır. 
   Lütfen ödevinizi en kısa sürede PDF formatına çevirerek sisteme yeniden yükleyiniz.

   İyi çalışmalar,
   [Akademisyen Adı]
   ```
