# Bulut Bilişim Projesi: RESTful API Destekli "Görev Yöneticisi" Kapsamlı Proje Geliştirme Raporu

**Hazırlayan:** [Adınız Soyadınız]  
**Ders:** 3522 Bulut Bilişim  
**Konu:** İki Katmanlı (Two-Tier) To-Do List Web Uygulaması ve Gelişim Süreci  
**Tarih:** Bahar Dönemi, 2026  

---

## 1. Neyi Amaçladık? (Giriş ve Projenin Çıkış Noktası)

Günümüz dijital yaşantısında "zaman ve iş yönetimi" bireylerin en temel ihtiyaçlarından biri haline gelmiştir. Bu projenin çekirdek fikri, kullanıcılara günlük planlarını takip edebilecekleri pratik bir platform sunmaktı. Ancak salt amaç sadece bir "Yapılacaklar Listesi (To-Do List)" üretmek değil; bu fikri, endüstri standartlarına uygun bir bulut bilişim mimarisi (Client-Server / İstemci-Sunucu) üzerinden modellemekti.

**Projedeki başlıca akademik ve teknik amaçlarımız şunlardı:**
1. **İki Katmanlı (Two-Tier) Mimariyi Uygulamak:** Sunum katmanını (Frontend) ve Veri/İş mantığı katmanını (Backend) birbirinden tamamen izole ederek "Stateless" (durumsuz) bir API entegrasyonu deneyimlemek.
2. **Kapsamlı Bir Görev Yönetimi Sunmak:** Sadece düz metin girmek yerine; görevin öncelik seviyesi (Priority), son teslim tarihi (Deadline) ve anlık tamamlanma oranını sunan kompleks bir web uygulaması inşa etmek.
3. **Bulut ve Dağıtım Sürecine (Deployment) Hazır Altyapı:** Lokal sistemdeki dosya bazlı veritabanından, Node.js sunucusuna kadar tüm kaynakların bir Docker container'ı veya AWS EC2 makinesine anında, hiçbir ayar bozulmadan taşınabilecek şekilde "Çevre Dostu (.env yapılandırması)" çalışmasını sağlamak.
4. **Modern Kullanıcı Arayüzü Eğilimlerini Yakalamak:** Sıradan tablolar ve butonlar yerine, Glassmorphism (yapay zeka ve modern cam tasarımı) prensiplerini barındıran; arama, filtreleme ve sıralama gibi işlemlerde (Single Page Application yapısı sayesinde) sayfa yenilenmesini 0'a indiren kusursuz bir kullanıcı deneyimi yaratmak.

---

## 2. Ne Yaptık? (Uygulamanın ve Projenin Nihai Hali)

Hedeflenen bu amaçlar doğrultusunda, a'dan z'ye sıfırdan kodlanmış kapsamlı bir web tabanlı Görev Yöneticisi ortaya çıkardık. Sistemin son halinde ortaya koyduğumuz çıktıları iki parçaya bölebiliriz:

### A. Sunucu ve API Katmanı (Backend)
- Gelen tüm HTTP (GET, POST, PUT, DELETE) isteklerini JSON veri tipiyle karşılayan ve sadece JSON ile cevap dönen bir **Node.js / Express.js REST API**.
- Bu API'ye entegre, hiçbir harici sunucu kurulumu gerektirmeyen gömülü **SQLite** (`todos.db`) veritabanı yığını.
- Frontend'ten gelecek isteklerin trafiğe takılmaması veya güvenlik duvarına vurmaması için yazılmış **CORS** kural setleri.

### B. İstemci ve Etkileşim Katmanı (Frontend)
- Kullanıcıların tarayıcı üzerinden giriş yaptığı **React.js** tabanlı bir arayüz.
- Sistemin öne çıkan modülleri:
  - **Mega Form:** Kullanıcının görev başlığı atamasının yanı sıra, görevin önceliğini (Düşük/Orta/Yüksek) ve varsa "Son Teslim Tarihi"ni kolayca girebilmesi.
  - **Dinamik Progress Bar:** Eklenen veya bitirilen görevlere göre anlık olarak % (yüzdelik) üzerinden dolan veya azalan neon renkli ilerleme çubuğu.
  - **Gerçek Zamanlı Arama ve Sıralama:** Girilen onca veri içerisinde zaman kaybı yaşanmaması adına; React 'State' sistemini kullanarak sayfayı saniyenin onda biri kadar sürede filtreleyen arama çubuğu ve (Önceliğe Göre, Tarihe Göre) sıralama sistemi.
  - **Uyarı Sistemi:** Düzenlenen görevlerde eğer "Son Teslim Tarihi" geçmiş ise bunu algılayıp "Gecikmiş" uyarı pencereleri çıkaran denetmen mekanizması.

---

## 3. Nasıl Yaptık? (Geliştirme Metodolojisi ve Süreç)

Projenin geliştirilme süreci, yazılım mühendisliği disiplinlerine sadık kalınarak adım adım modüler bir yapıyla sürdürülmüştür.

### Adım 1: Model ve Veritabanı Temellerinin Atılması
İşe ilk olarak veritabanını modelleyerek başladık. Bir görevin hangi alt dallara sahip olabileceği listelendi. Klasik "id, unvan ve tamamlanma durumu" üçlüsüne ek olarak `priority` (öncelik), `due_date` (son tarih) ve `created_at` (eklenme zamanı) gibi metadata alanlarını destekleyecek SQL sarmalı (CREATE TABLE) planlandı ve **better-sqlite3** paketi aracılığıyla kodlara entegre edildi.

### Adım 2: Express.js ile API Tasarımı
Veritabanı hazırlandıktan sonra, bu veritabanındaki bilgileri dış dünyaya (arayüze) sunacak kapıların açılması gerekti. Bunun için Modül-Controller-Route (MCR) yapısına uygun bir dosya hiyerarşisi oluşturuldu:
- `todoModel.js`: Sadece ve sadece veritabanına sorgu atar (`SELECT * FROM todos`, `INSERT INTO` vb.).
- `todoController.js`: Frontend'ten gelen istekleri (örneğin; kullanıcının görevi silme talebini) karşılar, görev gerçekten var mı kontrol eder, ve "404 Not Found" veya "200 Success" mesajlarıyla güvenli ağ trafiği sağlar.
- `todoRoutes.js`: Hangi Linkin (Örn: `/api/todos/:id` ) hangi Controller fonksiyonunu tetikleyeceğini denetler.

### Adım 3: React.js İle UI/UX'in Hayat Bulması
API sorunsuz bir biçimde JSON fırlatmaya başladığında, gözler tamamen "Son Kullanıcı Deneyimi" (UI/UX) üzerine dikildi. **Vite.js** paketleyicisi kullanılarak inşa edilen React projesinde:
- Gelişmiş tasarım algısını verebilmek adına koyu tema (Dark Mode) ve "Glassmorphism" (Camlaştırma) efekti CSS (index.css) üzerinde yoğun emek verilerek piksel piksel işlendi.
- Backend'e REST çağrısı atabilmek için React bileşenleri içinde `Axios` kütüphanesi yapılandırıldı (`useEffect` hook'u içinde veriler mount edildiğinde çekildi).
- İleri seviye gereksinimler eklendikçe (Arama motoru, Sekme filtresi vb.) `useState` mimarisi genişletilerek `searchQuery` (arama metni), `sortBy` (sıralama kuralı) gibi parametreler uygulama içine serpildi ve `Array.prototype.filter/sort` döngüleriyle donatıldı.

---

## 4. Karşılaştığımız Mimarî Sorunlar ve Çözüm Teknikleri

Bu çapta ve iki ayrı sunucunun eşzamanlı konuştuğu (Two-Tier) bir projede elbette pürüzsüz ilerlemek mümkün olmadı. Karşılaştığımız bazı temel teknik problemler ve bunları aşma metodlarımız şunlardı:

### Sorun 1: CORS Politikaları ve Port Çarpışması
**Problem:** Backend uygulamamız `localhost:5000` portundan yayın yaparken, React arayüzümüz `localhost:3000` portundan çalışıyordu. Tarayıcıların katı güvenlik politikaları gereği, bir porttan başka bir porta atılan HTTP istekleri (Preflight request) doğrudan "Cross-Origin Resource Sharing (CORS) Policy" hatasına takılarak bloke edildi.
**Nasıl Çözdük?** Backend API kodlarımızın içerisine bir katman (Middleware) daha yazdık. Express sunucusuna resmi `cors` kütüphanesini dahil ederek `app.use(cors({ origin: '*' }))` iznini entegre ettik. Bu sayede, Bulut mimarilerdeki izole node'ların birbiriyle konuşmasını yetkilendirmeyi akademik olarak pratik etmiş olduk. Öğrendik ki iki katman ayrı makinelerde çalıştığı zaman, birbirlerini güvenilir kaynak olarak onaylamak zorundalar.

### Sorun 2: Canlı Veritabanında (Production-Like) Migrasyon Riski
**Problem:** Projenin başlangıç aşamasını standart bir "To-Do" app olarak kodlamıştık. Ancak ilerleyen aşamalarda projeye sonradan özellikler paketi eklemeye karar verdik (Kritik Mega Güncellenme). Bu güncelleme dahilinde veritabanına `due_date` (Son Teslim Tarihi) özelliği eklenmeliydi. Fakat hâlihazırda sistemde aktif verilerle dolmaya başlamış `todos.db` isminde bir SQLite listesi mevcuttu. Doğrudan `CREATE TABLE` kodunu değiştirdiğimizde, SQLite zaten o tabloyu belleğinde tuttuğu için yeni sütunu (due_date) içeri almadı, eski verileri de silmememiz gerekiyordu.
**Nasıl Çözdük?** Bu aşamada gerçek dünya projelerinde sıkça karşımıza çıkan "Database Migration (Veritabanı Göçü)" sorununu mikro çapta yaşadık. Verileri korumak adına veritabanı kurgumuz (database.js) içerisine ufak bir `try-catch` mekanizması yerleştirdik ve bu bloğun içine `ALTER TABLE todos ADD COLUMN due_date TEXT;` SQL sorgusunu basarak, uygulama bir sonraki ayağa kalkışında mevcut verileri veya tabloyu uçurmadan, eski tabloları yama yapacak güvenli kod mantığını uyguladık.

### Sorun 3: State Karmaşası ve Performans
**Problem:** Öğrenci olarak "Tümü, Tamamlananlar, Bekleyenler", bir de üzerine "Arama Çubuğu" bir de "Sıralama" özelliği yapmaya çalıştığımızda React içindeki State sayısının çok fazla artması. Başlangıçta örneğin; kullanıcı arama kutusuna 'Elma' yazdığında, her harfe tıklandığında Backend sunucusuna `?search=El` diye yeni bir istek gönderiliyordu, ve aynı anda başka bir tuşa basılırsa uygulamada lag ve tepki yavaşlığı mevcuttu.
**Nasıl Çözdük?** Optimizasyon devreye girdi. API'mizin sadece verileri ilk açılışta veya gerçekten taze veri eklendiğinde/silindiğinde çekmesine, aradaki tüm 'görsel illüzyonların' ve 'filtreleme/sıralama' operasyonlarının doğrudan istemcinin cihazında (Frontend) işlenmesine karar verildi. İstemci 100 veriyi aldıktan sonra; ne kadar bekleyenleri filtrelerse filtrelesin veya ne kadar kelime aratırsa aratsın, hiç backend API'ye istek gidip vakit kaybedilmeden elindeki `todos` array dizisi üzerinde `.filter` ve `.sort` ile saniyelik olarak (Derived State mantığıyla) sonucu ekrana sığdırdı. Bu çok ciddi bir gecikme iyileştirmesi sağladı.

---

## 5. Gelecek Geliştirmeler ve Sonuç

Bu proğramlama ödevi ve süreç neticesinde; "Birbirinden kopuk ancak bir o kadar da mükemmel bir uyum ile entegre olmuş dağıtık sistemler"in mantığı çok keskin bir şekilde kavramış bulunmaktayız. Şu anda kodlar tamamen GitHub üzerinde versiyonlanmış (`feature`, `bugfix`, `docs` formatlarıyla commitlenmiş) ve yerel testlerini hatasız atlatmıştır. 

Gelecekteki ölçeklendirme hederlerimiz arasında;
- Bu Node.js kodlarını bir **Nginx** ters vekili (Reverse Proxy) arkasına gizleyerek Amazon EC2 üzerinde host etmek,
- PM2 aracıyla arka planda uygulamanın kesintisiz dinlenmesini (daemonize edilmesi) sağlamak,
- SQLite veritabanını Cloud tarafında ölçeklemeye çok daha yatkın olan bulut destekli bir yapıyla (PostgreSQL) değiştirmek yatmaktadır.

Bu uzun ve meşakkatli geliştirme süreci hem mimari algımızı hem de programlama disiplinlerimizi profesyonel standartlara çekme konusunda harika bir deneyim imkanı oluşturmuştur. 

*(Son. - Çalışma alanında tüm kodlar ektedir.)*
