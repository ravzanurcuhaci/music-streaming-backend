# Müzik Streaming Backend API

## Projeye Genel Bakış
Bu proje, bir müzik dinleme platformu için geliştirilmiş güçlü ve ölçeklenebilir bir RESTful API'dir. Kullanıcı kimlik doğrulama, kütüphane yönetimi (şarkılar, albümler, çalma listeleri, sanatçılar) ve rol tabanlı erişim kontrolü gibi temel arka uç işlevlerini sağlar.

## Özellikler
- **Kullanıcı Kimlik Doğrulama:** JWT (JSON Web Tokens) kullanarak güvenli kullanıcı kaydı ve girişi.
- **Rol Tabanlı Yetkilendirme:** Son kullanıcılar ve yöneticiler için farklı erişim seviyeleri.
- **İlişkisel Veritabanı Yönetimi:** PostgreSQL ile karmaşık sorgular ve veritabanı ilişkilerinin yönetimi.
- **CRUD İşlemleri:** Kullanıcılar, Şarkılar, Albümler, Sanatçılar, Çalma Listeleri ve Dinleme Geçmişi için tam RESTful desteği.
- **Middleware & Hata Yönetimi:** Tutarlı hata yanıtları ve girdi doğrulaması için global middleware kullanımı.

## Teknolojiler
- **Çalışma Zamanı Ortamı:** Node.js
- **Web Çerçevesi:** Express.js
- **Veritabanı:** PostgreSQL
- **Kimlik Doğrulama:** JSON Web Tokens (JWT)
- **Test:** Jest & Supertest

## Mimari
Uygulama, temel Katmanlı (Layered) / Model-View-Controller (MVC) benzeri bir mimariyi takip eder:
- `app.js` / `index.js`: Uygulamayı ayağa kaldıran ve global katmanları (middleware) tanımlayan ana dosya.
- `routes/`: Gelen istekleri ilgili controller'lara yönlendiren yönlendiriciler (routers).
- `controllers/`: İstekleri karşılayan ve yanıtları gönderen kontrol birimleri.
- `services/`: Temel iş mantığı (business logic) ve veritabanı işlemlerinin yapıldığı katman.
- `middlewares/`: Özel ara yazılımlar (örn., yetki kontrolü, hata yakalama).
- `config/`: Veritabanı bağlantısı gibi yapılandırma dosyaları.

## Veritabanı Şeması
Veritabanı PostgreSQL kullanmakta olup başlıca tablolar şu şekildedir:
- **Users:** Kullanıcı bilgileri ve rolleri.
- **Artists:** Müzik sanatçı bilgileri.
- **Albums:** Sanatçılara bağlı şarkı koleksiyonları.
- **Songs:** Tekil müzik parçaları.
- **Playlists:** Kullanıcıların oluşturduğu çalma listeleri.
- **Playlist_Songs:** Çalma listeleri ile şarkıları birbirine bağlayan ara tablo.
- **Listening_History:** Hangi kullanıcının hangi şarkıyı ne zaman dinlediğinin geçmişi.

## API Uç Noktaları (Endpoints)
*Tüm istekler için temel yol: `http://localhost:3000`*

| Kaynak | Temel Yol | Açıklama |
|---|---|---|
| **Auth** | `/auth` | Kimlik doğrulama (Kayıt, Giriş) |
| **Songs** | `/songs` | Şarkı işlemleri |
| **Albums** | `/albums` | Albüm işlemleri |
| **Artists** | `/artists` | Sanatçı işlemleri |
| **Playlists** | `/playlists` | Çalma listesi işlemleri |
| **Playlist Songs** | `/playlist-songs` | Çalma listesine şarkı ekleme/kaldırma |
| **Listening History** | `/listening-history` | Dinleme geçmişi bilgileri |

## Örnek İstekler

### 1. Kullanıcı Girişi (POST `/auth/login`)
**İstek:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
**Yanıt (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

### 2. Tüm Şarkıları Getir (GET `/songs`)
**Gerekli Başlık:**
`Authorization: Bearer <your_jwt_token>`

**Yanıt (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Bohemian Rhapsody",
      "artist_id": 5,
      "duration": 354
    }
  ]
}
```

## Kurulum

1. **Projeyi Klonlayın:**
   ```bash
   git clone <repository-url>
   cd music-streaming-backend
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Veritabanı Kurulumu:**
   PostgreSQL'in kurulu ve çalıştığından emin olun. `.env` yapılandırmanıza uygun bir veritabanı (örneğin `musıc_db`) oluşturun.

4. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

## Ortam Değişkenleri
Proje kök dizininde bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin (veya kendi ayarlarınıza göre güncelleyin):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=musıc_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## Test Ortamı
Testler için **Jest** ve **Supertest** kullanılmıştır.
- Tüm testleri çalıştırmak için:
  ```bash
  npm test
  ```
- Testleri izleme (watch) modunda çalıştırmak için:
  ```bash
  npm run test:watch
  ```

## Öğrenimler
Bu projenin geliştirilmesi süresince pekiştirilen temel kavramlar şunlardır:
- Node.js uygulamalarında `service/controller` yapısı ile daha iyi bir modülerlik sağlanması.
- JWT ve environment (ortam) yapılandırmalarıyla uygulamayı daha güvenli hale getirmek.
- PostgreSQL ile veritabanı tasarımı yapıp birbirine bağlı tablolar arasında ilişkisel sorguların uçtan uca çalıştırılması.
- Express üzerinde esnek hata (Error Handling) kurgusunun global olarak ele alınması.
- Test kavramlarına ve Node.js için Jest ile API testlerinin yazımına girizgah yapılması.
