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
      },
      {
        title: "Yaşam döngüsü",
        body: "Awake, OnEnable, Start, Update, FixedUpdate, LateUpdate. Hangisi ne için ve yanlış seçince ne kırılır.",
      },
      {
        title: "Sahne ve bileşenler",
        body: "GameObject, Prefab, Transform hiyerarşisi ve bir ay sonra da düzenleyebileceğin bir sahne kurmak.",
      },
      {
        title: "Fizik",
        body: "Rigidbody, Collider, trigger, Raycast ve layer mask. Yanına gerçekte karşılaşacağın hata biçimleriyle.",
      },
      {
        title: "Üretim desenleri",
        body: "Oyun koduna uygulanan SOLID, ScriptableObject, event yapıları ve sistemlerin birbirine dolanmasını engellemek.",
      },
      {
        title: "Telefonda performans",
        body: "Update içine asla ne yazılmaz, pooling, allocation, draw call ve tahmin yerine profil okumak.",
      },
      {
        title: "Üçüncü parti araçlar",
        body: "DOTween gibi paketleri eklemek, bir bağımlılığın sana neye mal olduğunu ölçmek ve ne zaman kendin yazacağını bilmek.",
      },
      {
        title: "Yayına çıkarmak",
        body: "Build ayarları, mobil hedefler ve reklam ile analytics'in oyunu ele geçirmeden nasıl yerleştiği.",
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
