# 📝 Çift Katmanlı To-Do List Uygulaması

> **3522 Bulut Bilişim Dersi — Proje 1**
> RESTful API tabanlı, iki katmanlı (Two-Tier) web uygulaması.

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3.x-003B57?style=flat-square&logo=sqlite&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📌 Proje Hakkında

Bu proje, **Bulut Bilişim** dersi kapsamında geliştirilmektedir. Kullanıcıların görevlerini (to-do) yönetebileceği, **iki katmanlı mimari** üzerine kurulu bir web uygulamasıdır.

- **Katman 1 – Uygulama Katmanı:** Node.js + Express.js ile geliştirilen RESTful Backend API
- **Katman 2 – Veri Katmanı:** SQLite ilişkisel veritabanı

---

## 🏗️ Sistem Mimarisi

```
┌─────────────────────────────────────┐
│        FRONTEND (React.js)          │  ← Port 3000
│  - Kullanıcı Arayüzü (SPA)          │
│  - Axios HTTP İstekleri             │
│  - State Management                 │
└────────────────┬────────────────────┘
                 │  HTTP / REST API
                 │  (JSON formatında)
┌────────────────▼────────────────────┐
│      BACKEND (Node.js/Express)      │  ← Port 5000
│  - RESTful API Endpoints            │
│  - İş Mantığı (Controller)          │
│  - CORS, dotenv, Middleware         │
└────────────────┬────────────────────┘
                 │  SQL Sorguları
                 │  (better-sqlite3)
┌────────────────▼────────────────────┐
│         VERİTABANI (SQLite)         │
│  - todos tablosu                    │
│  - Yerel .db dosyası                │
└─────────────────────────────────────┘
```

---

## 🛠️ Teknoloji Stack

| Katman | Teknoloji | Versiyon | Açıklama |
|--------|-----------|----------|----------|
| Backend Runtime | Node.js | v18+ | JavaScript çalışma ortamı |
| Backend Framework | Express.js | ^4.18 | HTTP sunucusu ve yönlendirme |
| Veritabanı | SQLite (better-sqlite3) | ^9.x | Hafif ilişkisel veritabanı |
| ORM / DB Driver | better-sqlite3 | ^9.x | Senkron SQLite bağlantısı |
| CORS | cors | ^2.x | Cross-Origin Resource Sharing |
| Ortam Değişkenleri | dotenv | ^16.x | .env dosyası desteği |
| Geliştirme Aracı | nodemon | ^3.x | Otomatik yeniden başlatma |
| Frontend | React.js | ^18.x | Kullanıcı arayüzü (yakında) |
| Bulut Platform | AWS / Render | — | Deployment (yakında) |

---

## 📁 Proje Klasör Yapısı

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── todoController.js   # İş mantığı ve HTTP yanıtları
│   │   ├── routes/
│   │   │   └── todoRoutes.js       # API rota tanımlamaları
│   │   ├── models/
│   │   │   └── todoModel.js        # Veritabanı CRUD işlemleri
│   │   ├── middleware/
│   │   │   └── cors.js             # CORS yapılandırması
│   │   └── db/
│   │       └── database.js         # SQLite bağlantısı ve tablo oluşturma
│   ├── data/                        # SQLite .db dosyası (git'e yüklenmez)
│   ├── app.js                       # Express uygulaması ve middleware
│   ├── server.js                    # Sunucu giriş noktası
│   ├── .env                         # Ortam değişkenleri (git'e yüklenmez)
│   ├── .env.example                 # Örnek ortam değişkenleri şablonu
│   └── package.json                 # Bağımlılıklar ve npm scriptleri
├── frontend/                        # React.js arayüzü
│   ├── src/
│   │   ├── App.jsx                  # Ana bileşen & Axios işlemleri
│   │   ├── index.css                # Premium Dark Mode / Glassmorphism
│   │   └── main.jsx                 # React root render
│   ├── index.html                   # HTML template & Fontlar
│   ├── vite.config.js               # Port: 3000 konfigürasyonu
│   └── package.json
├── .gitignore                       # Git'e yüklenmeyen dosyalar
└── README.md                        # Bu dosya
```

---

## 🚀 Kurulum ve Çalıştırma

### Ön Koşullar

- [Node.js](https://nodejs.org/) v18 veya üzeri
- npm v9 veya üzeri
- Git

### Backend Kurulumu

```bash
# 1. Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/todo-app.git
cd todo-app/backend

# 2. Bağımlılıkları kur
npm install

# 3. Ortam değişkenlerini ayarla
copy .env.example .env   # Windows
# cp .env.example .env   # Linux/Mac

# 4. Geliştirme sunucusunu başlat (nodemon ile otomatik yenileme)
npm run dev

# veya üretim modu
npm start
```

Sunucu başarıyla başladığında şu çıktıyı görürsünüz:
```
✅ Veritabanı bağlantısı kuruldu: ./data/todos.db
🚀 Sunucu http://localhost:5000 adresinde çalışıyor
🌍 Ortam: development
```

### Frontend Kurulumu (Port 3000)

```bash
# 1. Frontend klasörüne geç
cd todo-app/frontend

# 2. Bağımlılıkları kur
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev
```

> **Not:** Sistem iki katmanlı (Two-Tier) olduğu için, tam bir test yapmak için **Backend ve Frontend'in aynı anda (iki ayrı terminal penceresinde) çalıştırılması** gerekmektedir.

---

## 🔌 API Endpoint Dokümantasyonu

**Temel URL:** `http://localhost:5000`

### 📋 Genel Endpoint Tablosu

| Method | Endpoint | Açıklama | Request Body | Durum Kodu |
|--------|----------|----------|--------------|------------|
| `GET` | `/api/health` | Sunucu sağlık kontrolü | — | 200 |
| `GET` | `/api/todos` | Tüm görevleri listele | — | 200 |
| `GET` | `/api/todos/stats` | Görev istatistiklerini getir | — | 200 |
| `GET` | `/api/todos/:id` | ID'ye göre tek görev getir | — | 200 / 404 |
| `POST` | `/api/todos` | Yeni görev oluştur | JSON body | 201 |
| `PUT` | `/api/todos/:id` | Mevcut görevi güncelle | JSON body | 200 / 404 |
| `DELETE` | `/api/todos/:id` | Görevi kalıcı olarak sil | — | 200 / 404 |

---

### 🔍 GET Endpoint'leri

#### `GET /api/health`
Sunucunun çalışıp çalışmadığını kontrol eder.

```http
GET http://localhost:5000/api/health
```

**Örnek Yanıt (200 OK):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-29T15:00:00.000Z"
}
```

---

#### `GET /api/todos`
Tüm görevleri döner. Opsiyonel query parametreleriyle filtreleme yapılabilir.

```http
GET http://localhost:5000/api/todos
GET http://localhost:5000/api/todos?completed=true
GET http://localhost:5000/api/todos?priority=high
GET http://localhost:5000/api/todos?completed=false&priority=medium
```

| Query Param | Tip | Değerler | Açıklama |
|-------------|-----|----------|----------|
| `completed` | boolean | `true` / `false` | Tamamlanma durumuna göre filtrele |
| `priority` | string | `low` / `medium` / `high` | Önceliğe göre filtrele |

**Örnek Yanıt (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Express.js öğren",
      "description": "Backend API geliştirmek için",
      "completed": 0,
      "priority": "high",
      "created_at": "2026-03-29 15:00:00",
      "updated_at": "2026-03-29 15:00:00"
    }
  ]
}
```

---

#### `GET /api/todos/stats`
Görev istatistiklerini döner (toplam, tamamlanan, bekleyen, önceliğe göre dağılım).

```http
GET http://localhost:5000/api/todos/stats
```

**Örnek Yanıt (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 4,
    "pending": 6,
    "byPriority": {
      "high": 3,
      "medium": 5,
      "low": 2
    }
  }
}
```

---

#### `GET /api/todos/:id`
Belirtilen ID'ye sahip tek bir görevi döner.

```http
GET http://localhost:5000/api/todos/1
```

**Örnek Yanıt (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Express.js öğren",
    "description": "Backend API geliştirmek için",
    "completed": 0,
    "priority": "high",
    "created_at": "2026-03-29 15:00:00",
    "updated_at": "2026-03-29 15:00:00"
  }
}
```

**Hata Yanıtı (404 Not Found):**
```json
{
  "success": false,
  "message": "Görev bulunamadı"
}
```

---

### ➕ POST Endpoint'leri

#### `POST /api/todos`
Yeni bir görev oluşturur.

```http
POST http://localhost:5000/api/todos
Content-Type: application/json
```

**Request Body:**

| Alan | Tip | Zorunlu | Varsayılan | Açıklama |
|------|-----|---------|------------|----------|
| `title` | string | ✅ Evet | — | Görev başlığı |
| `description` | string | ❌ Hayır | `""` | Görev açıklaması |
| `priority` | string | ❌ Hayır | `"medium"` | `low` / `medium` / `high` |

**Örnek İstek:**
```json
{
  "title": "Express.js öğren",
  "description": "Backend API geliştirmek için",
  "priority": "high"
}
```

**Örnek Yanıt (201 Created):**
```json
{
  "success": true,
  "message": "Görev başarıyla oluşturuldu",
  "data": {
    "id": 1,
    "title": "Express.js öğren",
    "description": "Backend API geliştirmek için",
    "completed": 0,
    "priority": "high",
    "created_at": "2026-03-29 15:00:00",
    "updated_at": "2026-03-29 15:00:00"
  }
}
```

**Doğrulama Hatası (400 Bad Request):**
```json
{
  "success": false,
  "message": "Başlık (title) alanı zorunludur"
}
```

---

### ✏️ PUT Endpoint'leri

#### `PUT /api/todos/:id`
Belirtilen ID'ye sahip görevi kısmen veya tamamen günceller.

```http
PUT http://localhost:5000/api/todos/1
Content-Type: application/json
```

**Request Body (tüm alanlar opsiyonel):**

| Alan | Tip | Açıklama |
|------|-----|----------|
| `title` | string | Yeni başlık |
| `description` | string | Yeni açıklama |
| `completed` | boolean | `true` = tamamlandı, `false` = bekliyor |
| `priority` | string | `low` / `medium` / `high` |

**Örnek İstek (sadece tamamlama durumunu güncelle):**
```json
{
  "completed": true
}
```

**Örnek Yanıt (200 OK):**
```json
{
  "success": true,
  "message": "Görev başarıyla güncellendi",
  "data": {
    "id": 1,
    "title": "Express.js öğren",
    "description": "Backend API geliştirmek için",
    "completed": 1,
    "priority": "high",
    "created_at": "2026-03-29 15:00:00",
    "updated_at": "2026-03-29 16:00:00"
  }
}
```

---

### 🗑️ DELETE Endpoint'leri

#### `DELETE /api/todos/:id`
Belirtilen ID'ye sahip görevi kalıcı olarak siler.

```http
DELETE http://localhost:5000/api/todos/1
```

**Örnek Yanıt (200 OK):**
```json
{
  "success": true,
  "message": "Görev başarıyla silindi"
}
```

**Hata Yanıtı (404 Not Found):**
```json
{
  "success": false,
  "message": "Görev bulunamadı"
}
```

---

## 🗃️ Veritabanı Şeması

```sql
CREATE TABLE IF NOT EXISTS todos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  description TEXT    DEFAULT '',
  completed   INTEGER DEFAULT 0,         -- 0: bekliyor, 1: tamamlandı
  priority    TEXT    DEFAULT 'medium',  -- low | medium | high
  created_at  TEXT    DEFAULT (datetime('now', 'localtime')),
  updated_at  TEXT    DEFAULT (datetime('now', 'localtime'))
);
```

### Alan Açıklamaları

| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Benzersiz görev kimliği |
| `title` | TEXT | NOT NULL | Görev başlığı (zorunlu) |
| `description` | TEXT | DEFAULT `''` | Görev detay açıklaması |
| `completed` | INTEGER | DEFAULT `0` | 0 = bekliyor, 1 = tamamlandı |
| `priority` | TEXT | DEFAULT `'medium'` | Görev önceliği: low/medium/high |
| `created_at` | TEXT | DEFAULT şimdiki zaman | Oluşturulma zamanı |
| `updated_at` | TEXT | DEFAULT şimdiki zaman | Son güncelleme zamanı |

---

## 🌐 Ortam Değişkenleri (.env)

```env
# Sunucu Yapılandırması
PORT=5000
NODE_ENV=development

# Veritabanı
DB_PATH=./data/todos.db

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

## ☁️ Bulut Deploy (Yakında)

| Platform | Katman | Açıklama |
|----------|--------|----------|
| AWS EC2 / Render | Backend | Node.js API sunucusu |
| Vercel / Netlify | Frontend | React.js statik site |
| AWS RDS / Railway | Veritabanı | PostgreSQL (üretim için) |

---

## 📋 Geliştirme Günlüğü (Commit Geçmişi)

| Tarih | Commit | Açıklama |
|-------|--------|----------|
| 2026-03-29 | `feat: proje iskeleti` | Klasör yapısı, package.json, .gitignore |
| 2026-03-29 | `feat: backend mimarisi` | Express kurulumu, SQLite şeması, CRUD API |
| 2026-03-29 | `feat: modern React frontend UI and backend API integration completed` | React/Vite arayüzü, Axios API entegrasyonu, modern tasarım |
| 2026-04-05 | `feat: add edit functionality to todos` | Arayüzden görev metinlerini düzenleme özelliği eklendi |
| — | `feat: cloud deploy` | AWS/Render deployment (yakında) |

---

## 🧪 API Test Etme

API'yi test etmek için aşağıdaki araçlardan birini kullanabilirsiniz:

- **[Postman](https://www.postman.com/)** — GUI tabanlı API test aracı
- **[Insomnia](https://insomnia.rest/)** — Alternatif REST istemcisi
- **curl** — Komut satırı HTTP istemcisi

```bash
# Tüm görevleri listele
curl http://localhost:5000/api/todos

# Yeni görev oluştur
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Bulut Bilişim ödevi","priority":"high"}'

# Görevi tamamlandı olarak işaretle
curl -X PUT http://localhost:5000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Görevi sil
curl -X DELETE http://localhost:5000/api/todos/1
```

---

## 👤 Proje Sahibi

**3522 Bulut Bilişim Dersi — Proje 1**

---

*Bu proje eğitim amaçlı geliştirilmiştir.*
