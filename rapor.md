# Bulut Bilişim Dersi — Proje 1 Raporu

**Proje Adı:** İki Katmanlı (Two-Tier) REST API Destekli Görev Yöneticisi (To-Do List)  
**Tarih:** [GÜNÜN TARİHİNİ YAZIN]  
**Öğrenci Adı Soyadı:** [ADINIZI YAZIN]  

---

## 1. Proje Özeti
Bu proje, Bulut Bilişim prensiplerine uygun, modern istemci-sunucu (Client-Server) mimarisi standartlarını takip eden, RESTful API destekli gelişmiş bir görev yönetim (To-Do) sistemidir. Proje temel olarak iki ana katmandan oluşmaktadır: İstemci (Frontend) ve Sunucu (Backend + Veritabanı). Standart bir listeleme uygulamasından farklı olarak; dinamik arama, sıralama, görev önceliği atama, son teslim tarihi izleme ve asenkron ilerleme çubuğu gibi "İleri Seviye (Complex)" işlemleri bünyesinde barındırır.

## 2. Kullanılan Teknolojiler

### 2.1. Backend (Sunucu ve Veri Katmanı)
* **Node.js & Express.js:** Sistemin temel dinamiğini, route (yönlendirme) yapısını ve HTTP yanıtlarını oluşturmak için kullanıldı.
* **SQLite (better-sqlite3):** Minimalist yapısı nedeniyle veritabanı tercihi olarak kullanıldı. Tablolar diske bağlandı.
* **CORS:** Güvenlik katmanı olarak Frontend uygulamasından gelen isteklere sadece izin veren kurguyu çalıştırmak için kullanıldı.

### 2.2. Frontend (İstemci Katmanı)
* **React.js & Vite:** Tek sayfa uygulaması (Single Page Application - SPA) deneyimini sunabilmek için tercih edildi. Vite ile ultra hızlı bir port oluşturuldu.
* **Axios:** RESTful API aracılığıyla Backend tarafındaki JSON endpointlerine CRUD isteklerini atmak için kullanıldı.
* **Glassmorphism UI:** Orijinal bir kullanıcı deneyimi üretimi amaçlandı. Vanilla CSS ile uygulanan cam tasarımları, arayüze ferahlık ve netlik katar.

## 3. Sistem Mimarisi

Proje "Two-Tier" olarak tasarlanmıştır.

1. **Katman (Frontend):** Kullanıcı cihazında / tarayıcısında çalışır. React `State` mimarisiyle kullanıcı aksiyonlarına yakalar, veriyi anlık filtreler ve görselleştirir.
2. **Katman (Backend):** Merkezi mantığın yürütüldüğü, dış tehditlere kapalı noktadır. Veritabanıyla sadece bu katman muhatap olur.

## 4. Veritabanı Şeması
Projede `todos` adında gelişmiş parametreler barındıran tekil ve güçlü bir Entity (Varlık) yapısı mevcuttur.

```sql
CREATE TABLE IF NOT EXISTS todos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  description TEXT    DEFAULT '',
  completed   INTEGER DEFAULT 0,
  priority    TEXT    DEFAULT 'medium',
  due_date    TEXT,
  created_at  TEXT    DEFAULT (datetime('now', 'localtime')),
  updated_at  TEXT    DEFAULT (datetime('now', 'localtime'))
);
```

## 5. Öne Çıkan Gelişmiş Özellikler
* **Gerçek Zamanlı İlerleme Grafiği:** Anlık veriler oranlanıp grafiksel bir bar dolumu gerçekleştirilir.
* **Görev Aciliyeti ve Test (Priority):** Kullanıcıdan etiketler alınır ve DB'ye kaydedilir. UI tarafında vurgulanır.
* **Gecikmiş Zaman Damgası (`due_date` Kontrolü):** Görev zamanı gecikmişse kullanıcının arayüzde kırmızı bir uyarı alması tetiklenir.
* **Sıfır Yenileme ve Canlı Arama:** Gelen liste anlık render mantığıyla eş zamanlı filtrelenir ve sıralanır.

## 6. Sonuç
Ortaya; gelecekte AWS/Render gibi bulut platformlarına Docker ile yayınlamaya hazır (%100 Stateless Application mantığını taşıyan) bir proje çıkarılmıştır.
