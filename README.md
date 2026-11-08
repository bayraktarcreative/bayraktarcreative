# BAYRAKTAR CREATIVE — Sinematik Prodüksiyon & Görüntüleme Stüdyosu

> **"Every Frame Tells a Story."**

Uluslararası standartlarda, Awwwards kalitesinde, sinematik ve yüksek dönüşüm odaklı kreatif prodüksiyon stüdyosu web platformu.

---

## 🌟 Öne Çıkan Özellikler

1. **Full-Screen Cinematic Hero:**
   - Otomatik başlayan, sessiz, döngülü showreel video alanı
   - Ses açma/kapatma ve duraklatma/oynatma kontrolleri
   - Video yüklenene kadar zarif poster görseli
   - Staggered tipografik başlık animasyonu
   - Yönetim panelinden tek tıkla video ve poster değiştirebilme

2. **Asimetrik & Editoryal Portfolyo (Selected Works):**
   - Monoton olmayan, farklı oranlarda dengeli kompozisyon
   - Masaüstünde minimalist "İNCELE" ve "OYNAT" imleci
   - Açılır video modalı ve derinlemesine proje detay sayfaları (`/projeler/[slug]`)
   - Çoklu fotoğraf galerisi ve tam ekran lightbox
   - Teslim edilen çıktılar (Deliverables) modülü

3. **9:16 Dikey Format (Reels & Shorts Showcase):**
   - Instagram Reels ve TikTok oranını koruyan 9:16 bağımsız vitrin
   - Masaüstünde yatay kaydırmalı akış, mobilde doğal dokunmatik kaydırma
   - Tıklanınca dikey video modalı (ses kontrolü ve tam ekran izleme)
   - Performans optimizasyonu (yalnızca aktif video oynatılır)

4. **İnteraktif 360° Sanal Tur Altyapısı:**
   - Gelecekteki Matterport, Pannellum ve Kuula entegrasyonlarına hazır modüler altyapı
   - "Çok Yakında" ön talep toplama sistemi

5. **3 Aşamalı İnteraktif Teklif Sistemi:**
   - **Adım 1:** Hizmet seçimi (Drone, Sinematik Film, Fotoğraf, Reels, Sosyal Medya Yönetimi, Kapsamlı Paket)
   - **Adım 2:** Proje detayları (Sektör, lokasyon, tercih edilen tarih, açıklama)
   - **Adım 3:** İletişim bilgileri (Ad Soyad, telefon, e-posta, KVKK onayı)
   - Honeypot spam koruması ve veritabanına anında kalıcı kayıt

6. **Minimalist Canlı WhatsApp Butonu:**
   - Premium koyu tasarımla uyumlu, yeşil canlı nabız efektli yüzen buton
   - Yönetim panelinden düzenlenebilir telefon numarası ve varsayılan mesaj
   - Numara tanımlı değilse doğrudan teklif formuna yönlendirme

7. **Gelişmiş Yönetim Paneli (`/admin`):**
   - **Güvenli Kimlik Doğrulama:** Oturum korumalı giriş (`/admin/login`)
   - **Dashboard:** Gerçek zamanlı teklif sayaçları, proje istatistikleri
   - **Proje Yönetimi:** Yeni proje ekleme, düzenleme, silme, kapak ve çoklu galeri yönetimi
   - **Reels Yönetimi:** 9:16 dikey video ekleme/düzenleme/silme
   - **Ana Sayfa Medya Yönetimi:** Hero video, poster, hizmet görselleri, paralaks arka planı, about ve CTA arka planlarının kod düzenlemeden değiştirilebilmesi
   - **Site Ayarları & SEO:** Logo yükleme, favicon, WhatsApp, iletişim, meta başlık ve açıklamaları
   - **Teklif Talepleri:** Gelen başvuruları inceleme, durum değiştirme (Yeni, Görüşülüyor, Tamamlandı), stüdyo notu ekleme ve onaylı silme

---

## 🔑 Yönetim Paneli

Yönetici girişi varsayılan bir hesapla açılmaz. Paneli etkinleştirmek için `ADMIN_USER`, `ADMIN_PASSWORD` ve uzun, rastgele bir `SESSION_SECRET` ortam değişkeni tanımlayın. Bu değerleri kaynak koduna veya depoya eklemeyin.

---

## 🛠️ Kurulum ve Çalıştırma

### Geliştirme Modu (Development):
```bash
npm run dev
```

### Üretim Derlemesi (Production Build & Start):
```bash
npm run build
npm run start
```
Varsayılan olarak `http://localhost:3000` adresinde çalışır.

---

## 📁 Sayfa Mimarisi

- `/` — Sinematik Ana Sayfa
- `/hizmetler` — 4 Ana Uzmanlık ve 5 Aşamalı Prodüksiyon Süreci
- `/projeler` — Filtrelenebilir Proje Arşivi
- `/projeler/[slug]` — Proje Detay, Galeri ve Video Sayfası
- `/reels` — 9:16 Dikey Video Galerisi
- `/hakkimizda` — Stüdyo Felsefesi ve Teknik Standartlar
- `/iletisim` — İletişim Kanalları ve Entegre Teklif Formu
- `/admin` — İçerik ve Medya Yönetim Merkezi
- `/admin/login` — Güvenli Giriş Ekranı
- `/sitemap.xml` — Dinamik Proje Arama Motoru Haritası
- `/robots.txt` — SEO ve Güvenlik Direktifleri
