# 🎥 Bulut Bilişim Projesi 10 Dakikalık Video Sunum Senaryosu

Bu rehber, projenizi videoda anlatırken saniye saniye ne söylemeniz ve ekranda ne göstermeniz gerektiğini planlar.

---

### [00:00 - 01:00] Bölüm 1: Giriş ve Proje Amacı
* **Ekranda Ne Görünecek:** Yüzünüz veya Projenin hoşgeldin / GitHub Anasayfası.
* **Ne Söylenecek (Taslak):**
  "Merhaba, ben [Adınız Soyadınız]. 3522 Bulut Bilişim dersi kapsamında hazırlamış olduğum iki katmanlı (Two-Tier) To-Do List (Görev Yöneticisi) web projemin sunumuna hoş geldiniz. Amacım modern web mimarisini, RESTful API standartlarını ve gelişmiş bir arayüzü tek bir sistemde buluşturmaktı."

### [01:00 - 03:00] Bölüm 2: Proje Mimarisi (İki Katmanlı Yapı)
* **Ekranda Ne Görünecek:** Proje Klasör Yapısı (`backend` ve `frontend` klasörleri VS Code ekranı).
* **Ne Söylenecek (Taslak):**
  "Projem, tam anlamıyla 'Two-Tier' yani iki katmanlı bir sistem:
  - **Backend:** Node.js ve Express.js ile bir RESTful API. Veritabanı olarak da SQLite kullandım.
  - **Frontend:** Kullanıcı arayüzü için React.js (Vite) tercih ettim. Sunucumla (Backend) haberleşmek için `Axios` kullanarak istekler atıyorum."

### [03:00 - 05:00] Bölüm 3: Backend ve Kod İşleyişi İncelemesi
* **Ekranda Ne Görünecek:** `backend/src/controllers/todoController.js` dosyası.
* **Ne Söylenecek (Taslak):**
  "SQLite tablomda görev başlığı haricinde; görevin önceliği (priority) ve son teslim tarihi (due_date) gibi gelişmiş alanlar var. Controller katmanında bu parametreleri alıp güvenli bir şekilde işliyorum."

### [05:00 - 07:00] Bölüm 4: Frontend Yapısı
* **Ekranda Ne Görünecek:** `frontend/src/App.jsx` ve `index.css`.
* **Ne Söylenecek (Taslak):**
  "Frontend tarafında 'State'ler sayesinde arama kutusuna yazı yazdığımda tüm sayfa render olmadan liste filtrelenebiliyor, sıralanabiliyor. Tasarım olarak Glassmorphism (Cam etkisi) mimarisini kullandım."

### [07:00 - 09:30] Bölüm 5: Uygulamanın Canlı Demosu 
* **Ekranda Ne Görünecek:** Uygulamanın arayüzü (`localhost:3000` ekranı).
* **Ne Yapılacak:**
  1. Yeni bir, ileri tarihli görev ekleyin.
  2. Önceliği 'Yüksek' olan geçmiş tarihli görev ekleyip kırmızı çizgiyi ve Gecikmiş uyarısını gösterin.
  3. İlerleme çubuğunun dolduğuna ve sayaçlara dikkat çekin.
  4. Tepedeki canlı arama motorunun ve sıralamanın hızını gösterin.

### [09:30 - 10:00] Bölüm 6: Kapanış
* **Ekranda Ne Görünecek:** Tamamlanmış Tüm Görevler Arayüzü.
* **Ne Söylenecek (Taslak):**
  "Proje ödevim bu kadar. Sistemin kodları tamamen GitHub depomda barındırılmaktadır. Dinlediğiniz için teşekkür ederim." 
