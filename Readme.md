## 📝 Bölüm 1: Temel Kavramlar

Teknik detaylara girmeden önce, günümüz yapay zekâ dünyasını şekillendiren üç büyük kavramı bilgisayar dışı kişilerin de anlayabileceği günlük hayat örnekleriyle tanımlayalım.

### 🤖 Agentic AI (Ajan Tabanlı Yapay Zekâ) Nedir?
Geleneksel yapay zekâ (örneğin eski sohbet botları), sadece sorduğunuz soruya kelime kelime cevap veren bir **"ansiklopedi"** gibidir. **Agentic AI** ise sizin adınıza karar alabilen, plan yapan ve harekete geçen bir **"dijital asistan"** veya **"iş arkadaşı"**dır.
* **Gerçek Hayat Örneği:** Bir ansiklopediye *"Yarın yağmur yağacak mı?"* derseniz sadece *"Evet"* der. Bir yapay zekâ ajanı (Agent) ise *"Yarın yağmur yağacak, bu yüzden takvimindeki dış mekan toplantısını iptal edip yerine online toplantı linki oluşturmamı ister misin?"* diye sorar ve onaylarsanız bunu sizin adınıza yapar.

### 🌐 MCP (Model Context Protocol) Nedir?
Yapay zekâ modelleri (LLM) çok akıllıdır ancak sizin bilgisayarınızdaki dosyalardan, kullandığınız kurumsal programlardan veya güncel internet verilerinden habersizdirler (bir nevi dünyadan izole bir odada yaşarlar). 
**MCP (Model Bağlam Protokolü)**, yapay zekânın dış dünya ile güvenli bir şekilde konuşmasını, dosya okumasını, internette arama yapmasını sağlayan güvenli bir **"veri köprüsü"** veya **"çevirmen"**dir.

### ⚡ AI Agent Skill (Yapay Zekâ Yeteneği) Nedir?
Bir yapay zekâ ajanının belirli bir işi (örneğin e-posta göndermek, Excel dosyasını analiz etmek, hava durumunu kontrol etmek) mükemmel şekilde yapabilmesi için ona tanımlanmış özel **"alet çantası araçları"** veya **"uzmanlık kasları"**dır. Nasıl ki bir insanın "araba sürme" veya "yemek yapma" yeteneği varsa, ajanın da "SQL veritabanında sorgu çekme" yeteneği (skill) olabilir.

### ⚖️ MCP ve AI Agent Skill Arasındaki Fark Nedir? (Neden İkisine de İhtiyacımız Var?)

Katılımcılarımızın en çok karıştırdığı nokta burasıdır: **"İkisi de yapay zekâya iş yaptırıyorsa, farkları ne?"** En basit anlatımla; **MCP bir "Altyapı/Protokol"**, **AI Agent Skill ise o altyapıyı kullanan "Yetenek/Fonksiyon"**dur. 

Bunu bilgisayar dışı herkesin anlayabileceği günlük hayat metaforlarıyla açıklayalım:

| Benzetme Alanı | 🌐 MCP (Model Context Protocol) | ⚡ AI Agent Skill (Yetenek) |
| :--- | :--- | :--- |
| **Akıllı Telefon** | Telefonun **İnternet Bağlantısı (Wi-Fi/5G)** veya **İşletim Sistemidir**. Dış dünyaya açılan kapıdır. | Telefonun içine yüklediğiniz **WhatsApp, Spotify veya Bankacılık uygulamasıdır**. |
| **Ulaşım** | Şehirler arası yapılan **Otoban, Tren Rayı veya Köprüdür**. Güvenli ulaşım standardıdır. | O rayların üzerinde giden **Hızlı Tren**, otobanda giden **Kargo Kamyonudur**. |
| **İnsan Vücudu** | Beyninizden el ve kollarınıza giden **Sinir Sistemi ve Kas Altyapısıdır**. | Elinizi kullanarak yaptığınız **"Yazı Yazmak"**, **"Resim Çizmek"** veya **"Piyano Çalmak"** yeteneğidir. |

#### Özetle Akademik Bir Senaryo Üzerinden Bakarsak:
* **MCP olmasaydı:** Yapay zekâ ajanı muazzam bir "Makale Yazma Yeteneğine (Skill)" sahip olsa bile, üniversitenizin kapalı devre sunucusundaki öğrenci tezlerine **ulaşamazdı**, çünkü oraya giden bir yol (köprü) yoktu.
* **Skill olmasaydı:** MCP sayesinde üniversite sunucusuna güvenli bir köprü (otoban) kurulmuş olurdu, ancak yapay zekâ o sunucuya girdiğinde verileri nasıl analiz edeceğini, intihal kontrolünü nasıl yapacağını bilemezdi (yeteneksiz bir sürücü gibi kalırdı).

> 📌 **Kural:** MCP yapay zekâya veri ve sistemlerin kapısını **GÜVENLİCE AÇAR**; AI Agent Skill ise o kapıdan içeri girip işi **BİTİRİR**.

---

## 🏫 Bölüm 2: Hazır MCP Kullanımı (Akademik Problem Senaryosu)

**Senaryo (Bilgisayar Dışı Kişiler İçin):** Bir akademisyensiniz. Bilgisayarınızda yüzlerce öğrencinin dönem sonu projelerini içeren karmaşık bir klasör yapısı var. Notları acilen sisteme girmeniz gerekiyor ama hangi öğrencinin raporu eksik, hangisi ödevini yanlış formatta teslim etmiş tek tek klasörleri açıp bakacak vaktiniz yok. Yapay zekâ normalde bilgisayarınızın içindeki klasörleri göremez.

**Çözüm:** Hazır bir **Filesystem MCP Server** kullanarak yapay zekâya o klasörü inceleme yeteneği kazandıracağız.

### Uygulama Adımları:
1. Yapay zekâ arayüzünüzün yapılandırma dosyasına (`mcp.json`) hazır filesystem MCP'sini ekleyin:
```json
{
  "servers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Desktop/OgrenciOdevleri"
      ]
    }
  }
}
```
OgrenciOdevleri klasörünü incele. PDF formatında olmayan ödevleri listeleyerek bana bir tablo halinde rapor çıkar. Hangi öğrencilere 'Ödev formatınız hatalı' maili atmam gerektiğini listele.

### 🌐 Adım 2.2: Puppeteer (Web Sayfası Trama) MCP Sunucusu

Yapay zekanın internetteki akademik kaynakları, web sayfalarını ve duyuruları doğrudan ziyaret edip okuyabilmesi için resmi Puppeteer MCP sunucusunu entegre ediyoruz.

`mcp.json` dosyanıza şu bloğu ekleyin:

```json
{
  "servers": {
    "fetch-web": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-puppeteer"
      ]
    }
  }
}
```

### 🧠 Adım 2.3: Memory (Kalıcı Hafıza) MCP Sunucusu

**Senaryo:** Yapay zekâ her yeni sohbet penceresinde geçmişte konuştuğunuz akademik kuralları, öğrencilerin tez konularını ve proje detaylarını unutur. Hafıza MCP'si kullanarak yapay zekaya sohbetler ötesi, kalıcı bir "akademik hafıza" kazandıracağız.

`mcp.json` dosyanıza şu bloğu ekleyin:

```json
{
  "servers": {
    "academic-memory": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory"
      ]
    }
  }
}
```
🤖 Yapay Zekaya Verilecek Prompt (Hafıza Oluşturma):
"Memory yeteneğini kullanarak şu bilgileri kalıcı hafzana kaydet:

Ahmet'in mezuniyet projesi konusu 'Blokzincir Tabanlı Güvenli Mesajlaşma'dır ve danışmanı benim.

Proje teslim tarihi 15 Temmuz 2026'dır.

Raporlarda kaynakça formatı kesinlikle IEEE standartlarında olmalıdır."

# TEST
"Hafzandaki akademik bilgileri hatırla. Ahmet'in teslim etmesi gereken projenin son tarihi neydi ve raporunda hangi kaynakça formatını kullanması gerekiyor?"

Sonuç: Yapay zekâ geçmiş sohbeti bilmese bile, harici bellek sunucusuna bağlanarak bilgiyi saniyeler içinde çekecek ve önünüze getirecektir!

## 🛠️ Bölüm 3: Kendi Custom MCP Sunucumuzu Oluşturma

Hazır araçlar harika, peki ya üniversitemizin dışa kapalı, `http://localhost:3000` üzerinde çalışan **"Akademik Yayın ve Atıf Veritabanı"** sunucusuna bağlanmak istersek? 

Hem yapay zekanın arka planda standard girdi/çıktı (stdio) üzerinden sunucumuzla konuşmasını sağlayacağız hem de verileri tarayıcıdan `http://localhost:3000` yazarak canlı kontrol edebileceğimiz bir Express API katmanı kuracağız.

### 🔌 1. Adım: Bağımlılıkları Kurma
VS Code terminalinde projenizin içinde şu komutla gerekli paketleri kurun:

```bash
npm install express @modelcontextprotocol/sdk



## 📐 Bölüm 3.5: MCP Dinamikleri (Kritik Kavramlar)

Workshop katılımcılarının MCP'nin tam gücünü anlaması için sadece **Tools** (Araçlar) değil, protokolün sunduğu diğer 3 temel yapı taşını bilmesi gerekir. Bunları günlük hayat benzetmeleriyle inceleyelim:

### 🛠️ 1. Tools (Araçlar / Yetenekler)
Yapay zekanın dış dünyada aksiyon almasını, bir şeyleri değiştirmesini veya dinamik bir sorgu yapmasını sağlayan fonksiyonlardır. Yapay zekâ bu araçları kendi inisiyatifiyle parametre üreterek çalıştırır.
* **Akademik Örnek:** `localhost_hoca_verisi_cek(hoca_id: "dr_ali_kaya")` fonksiyonu bir araçtır. Yapay zekâ kullanıcıdan ismi alır, ID'ye dönüştürür ve aracı tetikler.

### 📄 2. Resources (Kaynaklar)
Yapay zekanın sadece okuyabileceği (Read-Only), sabit veya yarı-dinamik veri kaynaklarıdır. Tıpkı bir web sitesindeki ham metin belgesi, sabit bir kılavuz veya veri tablosu gibidir. Yapay zekâ buradaki veriyi değiştiremez, sadece arka plandaki bilgi havuzuna (bağlamına) ekler.
* **Akademik Örnek:** `localhost:3000/api/universite-yonetmeligi.txt` dosyası bir kaynaktır. Yapay zekâ buradaki sınav kurallarını okur ama kuralları kafasına göre değiştirecek bir kod çalıştıramaz.

### 📐 3. Resource Templates (Kaynak Şablonları)
Eğer yüzlerce farklı kaynak varsa ve her biri için ayrı ayrı "Resource" tanımlamak istemiyorsak, dinamik URL şablonları kullanırız. Yapay zekâ arama yaparken bu şablonun boşluklarını kendisi doldurur.
* **Akademik Örnek:** `localhost:3000/dersler/{ders_kodu}/mufredat` bir şablondur. Kullanıcı *"Yapay zekâ dersinde ne işleniyor?"* dediğinde, yapay zekâ şablonu otomatik olarak `localhost:3000/dersler/AI-101/mufredat` haline getirip veriyi okur.

### 🎭 4. Prompts (Hazır Komut Şablonları)
Kullanıcının yapay zekayı daha verimli kullanabilmesi için sunucu tarafından yapay zekâ arayüzüne enjekte edilen hazır prompt kalıplarıdır. Kullanıcı arayüzde bir butona basarak karmaşık bir analizi tek tıkla başlatabilir.
* **Akademik Örnek:** Sunucu yapay zekaya şu şablonu sunabilir: `"Akademik Teşvik Analizi Yap: {hoca_adi}"`. Kullanıcı sadece hocanın adını seçer, arka plandaki tüm prompt mühendisliği (system prompt) otomatik yüklenir.

---

## ⚡ Bölüm 4: AI Agent Skills (Yapay Zekâ Yetenekleri)

Yapay zekâ ajanlarının (AI Agents) sadece kod yazıp veya soru cevaplamakla kalmayıp, belirli mühendislik ve iş akışı metodolojilerini disiplinli bir şekilde takip etmesini sağlayan özel yönerge setlerine **AI Agent Skills** denir.

### 🌐 Popüler Hazır AI Agent Skill Örnekleri
Aşağıda, yapay zekâ kodlama asistanlarının (Cursor, Claude Code, Cline vb.) yazılım süreçlerini "vibe coding" (gelişigüzel kodlama) yerine planlı ve akademik/mühendislik standartlarına uygun yürütmesini sağlayan popüler yetenek şablonları yer almaktadır:

*   [**`/grill-me` (Sorgula/Sıkıştır)**](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md): Yazılacak kodun planını veya tasarım kararlarını test etmek için ajanı tek tek socratic sorular soran bir mülakatçıya dönüştürür.
*   [**`/domain-model` (Etki Alanı Modelleme)**](https://github.com/mattpocock/skills/tree/main/skills/engineering/domain-modeling): Kod yazmadan önce projenin terminolojisini ve kurallarını `CONTEXT.md` veya ADR (Architecture Decision Record) dosyaları üzerinden hizalar.
*   [**`/tdd` (Test Güdümlü Geliştirme)**](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd): Ajanın kod yazmadan önce test yazmasını ve Red-Green-Refactor döngüsünü uygulamasını zorunlu kılar.
*   [**`/diagnose` (Hata Teşhis)**](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs): Hataları çözmeden önce sistematik bir yaklaşımla (hata tekrarlama, hipotez kurma, en aza indirme) analiz edilmesini sağlar.

Bu yeteneklerin tamamına ve daha fazlasına Matt Pocock'ın açık kaynaklı [**mattpocock/skills**](https://github.com/mattpocock/skills) deposundan ulaşabilirsiniz.

---

## 🎓 Bölüm 5: Custom AI Agent Skill ile Akademisyen Probleminin Çözümü

Öğrencilerin teslim ettiği dosyaların formatlarını incelemek ve hatalı olanlara otomatik e-posta taslakları hazırlamak amacıyla özel bir yetenek olan [**akademisyen-problemi/SKILL.md**](file:///Users/cemalbolat/Desktop/GTU-Workshop-24.06.2026/skills/akademisyen-problemi/SKILL.md) dosyasını oluşturduk.

### 🛠️ Custom Skill Tanımı
Yeteneğin tüm yönerge ve kurallarına projemiz altındaki [**SKILL.md**](file:///Users/cemalbolat/Desktop/GTU-Workshop-24.06.2026/skills/akademisyen-problemi/SKILL.md) dosyasından ulaşabilirsiniz.

### 📊 Akademisyen Problemi Çözüm Raporu
Hazırladığımız custom skill yönergelerine göre `OgrenciOdevleri` klasörü taranmış ve aşağıdaki analiz sonuçları elde edilmiştir:

#### 🚫 Hatalı Teslim Yapan Öğrenciler Tablosu

| Öğrenci Adı | Teslim Edilen Dosya | Durum / Hata Nedeni |
| :--- | :--- | :--- |
| **Ayşe Demir** | `Dönem_Ödevi_Ayse_Demir.rar` | PDF değil (Sıkıştırılmış arşiv) |
| **Fatma Çelik** | `Dönem_Ödevi_Fatma_Celik.rar` | PDF değil (Sıkıştırılmış arşiv) |

*(Diğer 10 öğrenci ödevlerini doğru bir şekilde `.pdf` formatında teslim etmiştir.)*

#### ✉️ Otomatik Oluşturulan Uyarı E-postası Taslakları

1. **Ayşe Demir İçin E-posta Taslağı:**
   ```text
   Kime: ayse_demir@gtu.edu.tr
   Konu: Dönem Ödevi Format Hatası Uyarı

   Sayın Ayşe Demir,

   Teslim etmiş olduğunuz 'Dönem_Ödevi_Ayse_Demir.rar' isimli ödev dosyası belirlenen format kurallarına (PDF) uymamaktadır. 
   Lütfen ödevinizi en kısa sürede PDF formatına çevirerek sisteme yeniden yükleyiniz.

   İyi çalışmalar,
   Dersin Sorumlu Akademisyeni
   ```

2. **Fatma Çelik İçin E-posta Taslağı:**
   ```text
   Kime: fatma_celik@gtu.edu.tr
   Konu: Dönem Ödevi Format Hatası Uyarı

   Sayın Fatma Çelik,

   Teslim etmiş olduğunuz 'Dönem_Ödevi_Fatma_Celik.rar' isimli ödev dosyası belirlenen format kurallarına (PDF) uymamaktadır. 
   Lütfen ödevinizi en kısa sürede PDF formatına çevirerek sisteme yeniden yükleyiniz.

   İyi çalışmalar,
   Dersin Sorumlu Akademisyeni
   ```