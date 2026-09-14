/**
 * Türkçe sözlük. Diğer diller bunun tipine uymak zorunda.
 *
 * Terim kuralı: Unity ve C# tarafındaki her isim İngilizce kalır.
 * `Update`, `FixedUpdate`, `Rigidbody`, `SerializeField`, `Prefab` çevrilmez.
 * Çevrilen şey bunların etrafındaki cümledir.
 */
export const tr = {
  meta: {
    title: "Unity Academy",
    description:
      "C#, Unity ve mobil oyun üretiminin arkasındaki desenler. Anlat, yaz, çalıştır, kontrol et.",
  },
  nav: {
    home: "Ana sayfa",
    how: "Nasıl işliyor",
    build: "Ne yapacaksın",
    curriculum: "Müfredat",
    signIn: "Giriş yap",
    start: "Başla",
    skipToContent: "İçeriğe geç",
    themeToDark: "Koyu temaya geç",
    themeToLight: "Açık temaya geç",
    language: "Dil",
    switchLanguage: "İngilizceye geç",
  },
  hero: {
    badge: "Modül modül, sıfırdan yayına",
    titleTop: "Unity'yi gerçekten öğren.",
    titleAccent: "Oyununu yayına çıkar.",
    body:
      "C#, Unity'nin yaşam döngüsü, fizik ve mobil oyun üretiminin arkasındaki desenler. Her kavram anlatılır, sonra tarayıcıda sen yazarsın ve kontrol edilir.",
    ctaPrimary: "Hemen başla",
    ctaSecondary: "Müfredata bak",
  },
  check: {
    passed: "Geçti.",
    // Ada dokunmuyoruz: FixedUpdate ve fixedDeltaTime kod tarafındaki isimler.
    body: "Hareket FixedUpdate içinde çalışıyor ve fixedDeltaTime ile ölçekleniyor, yani kare hızından bağımsız.",
  },
  how: {
    title: "Nasıl işliyor",
    lead: "Her derste üç şey olur.",
    items: [
      {
        title: "Kavramı gör",
        body: "Her ders tek bir fikri baştan sona götürür. Kararın nasıl verildiğini görürsün, sadece bitmiş dosyayı değil.",
      },
      {
        title: "Kodu burada yaz",
        body: "Sonra aynı kodu tarayıcıda sen yazar ve kontrol edersin. Sonuç neyin çalıştığını, neyin neden kırıldığını söyler.",
      },
      {
        title: "Geri gelir",
        body: "İlk modüldeki kavramlar beşinci modülde yeniden karşına çıkar. Takvime göre değil, unuttuğun kadarına göre.",
      },
    ],
  },
  build: {
    title: "Ne yapacaksın",
    lead: "Üç tam proje. Her biri seni farklı bir şeyi öğrenmek zorunda bıraktığı için seçildi.",
    items: [
      {
        title: "Endless runner",
        body: "Girdi, karakter kontrolü, prosedürel zemin, object pooling ve ilk dakikadan sonra da ayakta kalan bir zorluk eğrisi.",
      },
      {
        title: "Idle oyun",
        body: "Çevrimdışı ilerleme, büyük sayı matematiği, kayıt ve yükleme, büyüdükçe okunur kalan bir yükseltme döngüsü.",
      },
      {
        title: "Playable ad",
        body: "Reklam olarak yayınlanacak kadar küçük bir build: dar kapsam, hızlı açılış, tek net kanca ve ağların dayattığı sınırlar.",
      },
    ],
  },
  curriculum: {
    title: "Müfredat",
    lead: "Sekiz modül. Sıra, hızdan daha önemli.",
    items: [
      {
        title: "Aklında kalan C#",
        body: "Tipler, erişim belirleyiciler ve SerializeField, Inspector'da ne değiştirdikleri gösterilerek anlatılır.",
        lessons: [
          "Değişkenler ve tipler",
          "public, private ve [SerializeField]",
          "Koşullar ve döngüler",
          "Metotlar ve sınıflar",
        ],
      },
      {
        title: "Yaşam döngüsü",
        body: "Awake, OnEnable, Start, Update, FixedUpdate, LateUpdate. Hangisi ne için ve yanlış seçince ne kırılır.",
        lessons: [
          "Awake ve Start",
          "Update ve kare hızı",
          "FixedUpdate ve fizik adımı",
          "OnEnable, OnDisable, LateUpdate",
        ],
      },
      {
        title: "Sahne ve bileşenler",
        body: "GameObject, Prefab, Transform hiyerarşisi ve bir ay sonra da düzenleyebileceğin bir sahne kurmak.",
        lessons: [
          "GameObject ve Component",
          "Transform hiyerarşisi",
          "Prefab üretmek",
          "Instantiate ve Destroy",
        ],
      },
      {
        title: "Fizik",
        body: "Rigidbody, Collider, trigger, Raycast ve layer mask. Yanına gerçekte karşılaşacağın hata biçimleriyle.",
        lessons: [
          "Rigidbody ve kuvvet",
          "Collider ve trigger",
          "Raycast ile nesne bulmak",
          "Layer ve collision matrix",
        ],
      },
      {
        title: "Üretim desenleri",
        body: "Oyun koduna uygulanan SOLID, ScriptableObject, event yapıları ve sistemlerin birbirine dolanmasını engellemek.",
        lessons: [
          "Tek sorumluluk",
          "ScriptableObject ile veri",
          "Event ve observer",
          "Bağımlılıkları ayırmak",
        ],
      },
      {
        title: "Telefonda performans",
        body: "Update içine asla ne yazılmaz, pooling, allocation, draw call ve tahmin yerine profil okumak.",
        lessons: [
          "Update içine ne yazılmaz",
          "Object pooling",
          "Allocation ve GC",
          "Draw call ve batching",
        ],
      },
      {
        title: "Üçüncü parti araçlar",
        body: "DOTween gibi paketleri eklemek, bir bağımlılığın sana neye mal olduğunu ölçmek ve ne zaman kendin yazacağını bilmek.",
        lessons: [
          "Package Manager",
          "DOTween ile hareket",
          "Bir bağımlılığın maliyeti",
        ],
      },
      {
        title: "Yayına çıkarmak",
        body: "Build ayarları, mobil hedefler ve reklam ile analytics'in oyunu ele geçirmeden nasıl yerleştiği.",
        lessons: [
          "Build ayarları",
          "Android ve iOS hedefleri",
          "Reklam ve analytics",
        ],
      },
    ],
  },
  cta: {
    title: "Başlamaya hazır",
    body: "Hesabını aç, ilk modül seni bekliyor.",
    button: "Hesap oluştur",
  },
  footer: {
    trademark: "Unity ve C#, ilgili sahiplerinin ticari markalarıdır.",
  },
  auth: {
    signInTitle: "Tekrar hoş geldin",
    signInLead: "Kaldığın yerden devam et.",
    username: "Kullanıcı adı",
    password: "Parola",
    showPassword: "Parolayı göster",
    hidePassword: "Parolayı gizle",
    submitSignIn: "Giriş yap",
    working: "Bir saniye",
    noAccountNote: "Hesapları eğitmen açıyor. Bilgilerin sana iletilir.",
    backHome: "Ana sayfaya dön",
    notice:
      "Bu ekran henüz bir sunucuya bağlı değil. Yazdıkların yalnızca bu tarayıcıda tutuluyor.",
    demoTitle: "Deneme hesapları",
    demoBody: "Dokunduğunda alanlar dolar.",
    demoStudent: "Öğrenci",
    demoInstructor: "Eğitmen",
    errors: {
      usernameRequired: "Kullanıcı adını yaz.",
      passwordRequired: "Parolanı yaz.",
      wrongCredentials: "Kullanıcı adı ya da parola hatalı.",
      usernameTaken: "Bu kullanıcı adı alınmış.",
      emailTaken: "Bu e-posta ile açılmış bir hesap zaten var.",
    },
  },
  app: {
    nav: {
      learn: "Öğren",
      progress: "İlerleme",
      homework: "Ödevler",
      profile: "Profil",
    },
    signOut: "Çıkış yap",
    menu: "Menü",
    greeting: "Merhaba",
    continueTitle: "Kaldığın yer",
    continueButton: "Devam et",
    startButton: "Başla",
    reviewButton: "Tekrar et",
    streak: "Seri",
    streakUnit: "gün",
    xp: "Puan",
    xpThisWeek: "Bu hafta",
    review: "Tekrar",
    reviewReady: "ders hazır",
    reviewNone: "Şimdilik tekrar yok",
    reviewLead: "İlk modüldeki kavramlar unutulmadan geri geliyor.",
    moduleLabel: "Modül",
    lessonsDone: "ders bitti",
    locked: "Kilitli",
    completed: "Tamamlandı",
    current: "Sıradaki",
    lockedHint: "Önceki dersi bitirince açılır.",
    pathTitle: "Yolun",
  },
  progressPage: {
    title: "İlerleme",
    lead: "Nerede olduğunu tek ekranda gör.",
    lessonsCompleted: "Tamamlanan ders",
    xpTotal: "Toplam puan",
    streakBest: "Güncel seri",
    byModule: "Modüllere göre",
  },
  homeworkPage: {
    title: "Ödevler",
    lead: "Ders sonunda verilen ödevler burada toplanır.",
    emptyTitle: "Henüz ödevin yok",
    emptyBody: "İlk dersi bitirdiğinde ilk ödevin burada görünecek.",
  },
  profilePage: {
    title: "Profil",
    account: "Hesap",
    name: "Ad",
    username: "Kullanıcı adı",
    email: "E-posta",
    role: "Rol",
    roleStudent: "Öğrenci",
    roleInstructor: "Eğitmen",
    preferences: "Tercihler",
    language: "Dil",
    theme: "Tema",
  },
  admin: {
    nav: {
      students: "Öğrenciler",
      profile: "Profil",
    },
    title: "Öğrenciler",
    lead: "Hesapları sen açıyorsun. Öğrenci kendi kaydını oluşturamaz.",
    newStudent: "Yeni öğrenci",
    newStudentLead: "Bilgileri gir, hesabı aç ve giriş bilgilerini öğrenciye ilet.",
    formName: "Ad soyad",
    formUsername: "Kullanıcı adı",
    formUsernameHint: "Harfle başlar; küçük harf, rakam ve alt çizgi. 3-20 karakter.",
    formEmail: "E-posta",
    formPassword: "Geçici parola",
    generate: "Üret",
    submit: "Hesabı aç",
    cancel: "Vazgeç",
    working: "Açılıyor",
    createdTitle: "Hesap açıldı",
    createdBody: "Bu bilgileri öğrenciye ilet. Parola bir daha gösterilmeyecek.",
    copy: "Kopyala",
    copied: "Kopyalandı",
    close: "Kapat",
    listCount: "kayıtlı öğrenci",
    emptyTitle: "Henüz öğrenci yok",
    emptyBody: "İlk hesabı açtığında listede burada görünecek.",
    colStudent: "Öğrenci",
    colProgress: "İlerleme",
    colXp: "Puan",
    colJoined: "Kayıt",
    lessonsShort: "ders",
    errors: {
      nameRequired: "Adını yaz.",
      usernameRequired: "Kullanıcı adı gerekli.",
      usernameInvalid: "Harfle başlamalı; küçük harf, rakam ve alt çizgi kullan.",
      emailRequired: "E-posta gerekli.",
      emailInvalid: "Bu e-posta adresi geçerli görünmüyor.",
      passwordShort: "Parola en az 8 karakter olmalı.",
    },
  },
} as const;

/**
 * `as const` sayesinde tr sözlüğü birebir değerlere kilitleniyor. Diğer dillerin
 * aynı değerleri yazması gerekmesin diye tipi genişletiyoruz: yapı ve alan adları
 * aynı kalır, metinler serbesttir. Dizi uzunlukları da sabit kalır, bir dilde
 * eksik madde kalamaz.
 */
type Widen<T> = T extends string
  ? string
  : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof tr>;
