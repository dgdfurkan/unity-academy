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
    note: "Önce anlat, sonra yazdır, sonra kontrol et.",
  },
  check: {
    passed: "Geçti.",
    // Ada dokunmuyoruz: FixedUpdate ve fixedDeltaTime kod tarafındaki isimler.
    body: "Hareket FixedUpdate içinde çalışıyor ve fixedDeltaTime ile ölçekleniyor, yani kare hızından bağımsız.",
  },
  stats: {
    lessons: { value: "30", label: "Uçtan uca yazılmış ders" },
    projects: { value: "3", label: "Yayınlanabilir proje" },
  },
  why: {
    title: "Neden Böyle Öğretiyoruz?",
    lead: "Video izleyip anladığını sanmak ile kodu yazıp çalıştırmak arasındaki fark.",
    items: [
      "Her kavram Unity'de ne değiştirdiği gösterilerek anlatılır",
      "Kodu sen yazarsın, kontrol edilir, neden kırıldığını görürsün",
      "Her modül yayınlanabilir bir şeyle biter, alıştırma dosyasıyla değil",
    ],
  },
  practice: {
    tag: "Tarayıcıda çalışır",
    title: "Yaz, Çalıştır, Ne Olduğunu Gör",
    body: "Kod editörü sitenin içinde. Unity kurmadan yazmaya başlarsın; kontrol ettiğinde neyin çalıştığını ve neyin neden kırıldığını satır satır görürsün.",
  },
  band: {
    title: "Bir Sonraki Oyunu Sen Yap",
    body: "Hesabını eğitmen açar, ilk modül seni bekler.",
    button: "Giriş yap",
  },
  how: {
    title: "Nasıl İşliyor?",
    lead: "Her derste üç şey olur.",
    items: [
      {
        title: "Kavramı Gör",
        body: "Her ders tek bir fikri baştan sona götürür. Kararın nasıl verildiğini görürsün, sadece bitmiş dosyayı değil.",
      },
      {
        title: "Kodu Burada Yaz",
        body: "Sonra aynı kodu tarayıcıda sen yazar ve kontrol edersin. Sonuç neyin çalıştığını, neyin neden kırıldığını söyler.",
      },
      {
        title: "Geri Gelir",
        body: "İlk modüldeki kavramlar beşinci modülde yeniden karşına çıkar. Takvime göre değil, unuttuğun kadarına göre.",
      },
    ],
  },
  build: {
    title: "Ne Yapacaksın?",
    lead: "Üç tam proje. Her biri seni farklı bir şeyi öğrenmek zorunda bıraktığı için seçildi.",
    items: [
      {
        title: "Endless Runner",
        body: "Girdi, karakter kontrolü, prosedürel zemin, object pooling ve ilk dakikadan sonra da ayakta kalan bir zorluk eğrisi.",
      },
      {
        title: "Idle Oyun",
        body: "Çevrimdışı ilerleme, büyük sayı matematiği, kayıt ve yükleme, büyüdükçe okunur kalan bir yükseltme döngüsü.",
      },
      {
        title: "Playable Ad",
        body: "Reklam olarak yayınlanacak kadar küçük bir build: dar kapsam, hızlı açılış, tek net kanca ve ağların dayattığı sınırlar.",
      },
    ],
  },
  curriculum: {
    title: "Müfredat",
    lead: "Dokuz modül, otuz ders. Sıra, hızdan daha önemli.",
    items: [
      {
        title: "Başlangıç",
        body: "Unity ne yapar, editörün altı penceresi ne işe yarar ve hangi kod editörüyle çalışacaksın.",
        lessons: [
          "Unity Nedir, Ne Değildir?",
          "Editör Turu: Altı Pencere",
          "Hangi Kod Editörü? Rider, Visual Studio, VS Code",
        ],
      },
      {
        title: "Aklında Kalan C#",
        body: "Tipler, erişim belirleyiciler ve SerializeField, Inspector'da ne değiştirdikleri gösterilerek anlatılır.",
        lessons: [
          "C# Nedir, Unity Onu Nasıl Çalıştırır?",
          "Değişkenler ve Tipler: int, float, bool, string",
          "public, private ve [SerializeField]",
          "Koşullar ve Döngüler",
          "Metotlar ve Sınıflar",
        ],
      },
      {
        title: "Yaşam Döngüsü",
        body: "Awake, OnEnable, Start, Update, FixedUpdate, LateUpdate. Hangisi ne için ve yanlış seçince ne kırılır.",
        lessons: [
          "MonoBehaviour ve İlk Script",
          "Awake, OnEnable, Start: Hangisi Ne Zaman?",
          "Update ve Kare Hızı: Time.deltaTime",
          "FixedUpdate ve LateUpdate",
        ],
      },
      {
        title: "Sahne ve Bileşenler",
        body: "GameObject, Prefab, Transform hiyerarşisi ve bir ay sonra da düzenleyebileceğin bir sahne kurmak.",
        lessons: [
          "GameObject ve Component",
          "Transform Hiyerarşisi",
          "Prefab Üretmek ve Güncellemek",
          "Instantiate ve Destroy",
        ],
      },
      {
        title: "Fizik",
        body: "Rigidbody, Collider, trigger, Raycast ve layer mask. Yanına gerçekte karşılaşacağın hata biçimleriyle.",
        lessons: [
          "Rigidbody ve Kuvvet",
          "Collider, Trigger ve Çarpışma",
          "Raycast ile Nesne Bulmak",
          "Layer ve Collision Matrix",
        ],
      },
      {
        title: "Girdi ve Oyun Döngüsü",
        body: "Dokunmatik girdi, oyun durumunun tek yerden yönetimi ve ilerlemeyi kaydedip geri yüklemek.",
        lessons: [
          "Dokunmatik Girdi",
          "Oyun Durumu: Başlangıç, Oynanış, Bitiş",
          "Kayıt ve Yükleme",
        ],
      },
      {
        title: "Üretim Desenleri",
        body: "Oyun koduna uygulanan SOLID, ScriptableObject, event yapıları ve sistemlerin birbirine dolanmasını engellemek.",
        lessons: [
          "Tek Sorumluluk: Script'i Bölmek",
          "ScriptableObject ile Veri",
          "Event ve Observer",
        ],
      },
      {
        title: "Telefonda Performans",
        body: "Update içine asla ne yazılmaz, pooling, allocation, draw call ve tahmin yerine profil okumak.",
        lessons: [
          "Update İçine Ne Yazılmaz?",
          "Pooling, Allocation ve Profiler",
        ],
      },
      {
        title: "Araçlar ve Yayın",
        body: "Paket eklemek, bir bağımlılığın maliyetini ölçmek, mobil hedefe build almak ve yayına çıkmak.",
        lessons: [
          "Package Manager ve DOTween",
          "Build Ayarları ve Yayın",
        ],
      },
    ],
  },
  cta: {
    title: "Başlamaya Hazır mısın?",
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
    demoTitle: "Deneme Hesapları",
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
    continueTitle: "Kaldığın Yer",
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
    soon: "Yakında",
    open: "Açık",
    completed: "Tamamlandı",
    current: "Sıradaki",
    lockedHint: "Önceki dersi bitirince açılır.",
    pathTitle: "Yolun",
  },
  lesson: {
    stepOf: "Adım",
    minutes: "dk",
    backToPath: "Yola dön",
    hook: "Başlangıç",
    predict: "Tahmin",
    teach: "Anlatım",
    check: "Kontrol",
    summary: "Özet",
    summaryTitle: "Akılda kalacak üç şey",
    checkAnswer: "Kontrol et",
    continue: "Devam",
    finish: "Dersi bitir",
    back: "Geri",
    correct: "Doğru",
    partly: "Bir kısmı doğru",
    wrong: "Bu değil",
    tryAgain: "Tekrar dene",
    reset: "Baştan",
    sortHint: "Bir öğeye dokun, sonra gireceği kutuya dokun.",
    sortDone: "Hepsi yerleştirildi.",
    hotspotHint: "Noktalara dokunarak gez.",
    hotspotEmpty: "Bir noktaya dokun, ne olduğunu oku.",
    read: "Bilgi",
    activity: "Etkinlik",
    task: "Alıştırma",
    orderHint: "Okları kullanarak doğru sıraya diz.",
    moveUp: "Yukarı taşı",
    moveDown: "Aşağı taşı",
    inspectorHint: "Inspector'daki değeri değiştir, kodun ne dediğine bak.",
    inspectorCode: "Kod",
    inspectorPanel: "Inspector",
    inspectorApply: "Play'e bas",
    codeHint: "Kodu yaz, sonra kontrol et.",
    codeEditor: "Kod editörü",
    codeCheckNote: "Kontrol, dersin öğrettiği özellikleri arar; tam bir C# derleyicisi değildir.",
    multiHint: "Birden fazla doğru cevap var.",
    matchHint: "Soldan bir öğe seç, sonra karşılığını seç.",
    spotHint: "Hatalı satıra dokun.",
    exerciseOf: "Soru",
    doneTitle: "Ders tamamlandı",
    doneBody: "Kazandığın puan ilerlemene eklendi.",
    pointsEarned: "puan",
    nextLesson: "Sonraki ders",
    comingSoonTitle: "Bu ders henüz yazılmadı",
    comingSoonBody:
      "Başlangıç modülü hazır. Diğer dersler beşerli gruplar hâlinde ekleniyor; sırası gelince burada açılacak.",
    lockedTitle: "Bu ders henüz açılmadı",
    lockedBody: "Önceki dersi bitirdiğinde açılır.",
    comments: {
      title: "Sorular ve yorumlar",
      lead: "Takıldığın yeri buraya yaz. Cevap herkeste kalır.",
      placeholder: "Bir soru sor ya da not bırak",
      send: "Gönder",
      empty: "Henüz yorum yok. İlk soruyu sen sor.",
      instructor: "Eğitmen",
      delete: "Sil",
      local: "Yorumlar şimdilik yalnızca bu tarayıcıda tutuluyor.",
    },
  },
  progressPage: {
    title: "İlerleme",
    lead: "Nerede olduğunu tek ekranda gör.",
    lessonsCompleted: "Ders",
    xpTotal: "Puan",
    streakBest: "Seri",
    byModule: "Modüllere Göre",
  },
  homeworkPage: {
    title: "Ödevler",
    lead: "Ders sonunda verilen ödevler burada toplanır.",
    emptyTitle: "Henüz Ödevin Yok",
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
    newStudent: "Yeni Öğrenci",
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
    createdTitle: "Hesap Açıldı",
    createdBody: "Bu bilgileri öğrenciye ilet. Parola bir daha gösterilmeyecek.",
    copy: "Kopyala",
    copied: "Kopyalandı",
    close: "Kapat",
    listCount: "kayıtlı öğrenci",
    emptyTitle: "Henüz Öğrenci Yok",
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
