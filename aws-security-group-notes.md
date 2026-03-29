# 🛡️ AWS EC2 Security Group - Port Yapılandırma Notları

AWS EC2 sunucunuzda web uygulamanızın düzgün çalışabilmesi için "Inbound Rules" (Gelen Kurallar) kısmından aşağıdaki portları dışarıya açmanız (0.0.0.0/0) gerekmektedir:

| Port | Tip | Protokol | Açıklama |
|------|-----|----------|----------|
| **22** | SSH | TCP | Sunucuya terminal (PuTTY/Terminal) üzerinden erişim sağlamak için zorunludur. |
| **80** | HTTP | TCP | Nginx web sunucusunun dış dünyadan (tarayıcılardan) gelen istekleri karşıladığı klasik web portudur. |
| **3000** | Custom TCP | TCP | (İsteğe bağlı) Eğer Nginx kurmadan direkt "npm run dev" ile frontend arayüzüne veya development moduna erişmek istiyorsanız geçici olarak açılır. |
| **5000** | Custom TCP | TCP | (İsteğe bağlı) Eğer Nginx kurmadan frontend arayüzünün doğrudan Express.js backend'ine (API) ulaşmasını sağlamak istiyorsanız açılır (Tavsiye edilen: 5000 nolu portu sadece Nginx reverse proxy için localhost 127.0.0.1 tarafında kullanıp, Security Group'tan dışarı kapatmaktır). |

## 🚀 Güvenlik Tavsiyesi
Üretime (Production) tam geçiş sağlandığında:
- Port 22'yi (SSH) sadece kendi IP adresinize (`My IP`) kısıtlayın.
- Port 3000 ve 5000 numaralı portları Inbound Rules tablosundan silebilirsiniz, Nginx 80 portu üzerinden proxy (yönlendirme) işlemi sağlayarak arkadaki servisleri yönetecektir!
