# CLAUDE.md

Unity ve C# öğreten interaktif kurs platformu. Açık bir ürün: birden çok öğrenci kayıt
olur, modülleri kendi hızında ilerletir. Tek kişiye özel bir ders sayfası değil.
Kapsam ve yol haritası için `docs/BRIEF.md`, arayüz kararları için `docs/DESIGN.md`.
Bu dosya çalışma kurallarını tutar.

## Mimari kısıtlar

- Frontend GitHub Pages üzerinde **statik** yayınlanır. Sunucu tarafı render, API route
  veya çalışma anında Node gerektiren hiçbir şey frontend'e girmez.
- Dinamik her şey tarayıcıdan Firebase SDK ile konuşur. Auth, Firestore, Storage.
- Erişim kontrolü Security Rules ile kurulur. Arayüzde bir kontrolü gizlemek güvenlik
  değildir; kural yazılmadan koleksiyon açılmaz.
- Bu iki kısıt her teknik kararı bağlar. Bir çözüm bunlardan birini bozuyorsa çözüm değildir.

## Kod kuralları

- SOLID ve nesne yönelimli tasarıma uyulur. Tek sorumluluk bozulmaz, bağımlılıklar somut
  sınıfa değil arayüze bağlanır.
- Derste "böyle yapmayın" denen kalıp platformun kendi kodunda bulunmaz.
- TypeScript'te `any` yok. Tip bilinmiyorsa öğrenilir, susturulmaz.
- Hata kökünden çözülür. `try/catch` ile yutmak, `@ts-ignore` ile geçmek yok.
- Mevcut dosya kalıbına uyulur. Yeni bir isimlendirme veya klasör düzeni dayatılmaz.

## Performans

- Render'ı tetiklemeyen işler render döngüsüne konmaz.
- 3B sahneler görünür olmadıkça çalışmaz, görünürlükten çıkınca durdurulur.
- Ağır modüller (kod editörü, 3B sahne) tembel yüklenir.
- Medya tembel yüklenir ve boyutu hedef ekrana göre verilir.
- Bir optimizasyon iddiası ölçümle desteklenir, tahminle değil.

## Arayüz

- Web, tablet ve mobil. Üçü de birinci sınıf, hiçbiri "sonra bakarız" değil.
- Mobil düzen Duolingo mantığında: alt navigasyon, tek elle kullanım, geniş dokunma
  alanı, dikey akış.
- Animasyonun işlevi olur: durum değişimi, dikkat yönlendirme veya geri bildirim.
  Süsleme amaçlı animasyon eklenmez.
- `prefers-reduced-motion` desteklenir.
- WCAG 2.2 AA. Klavyeyle tam gezinti, yeterli kontrast, anlamlı ekran okuyucu çıktısı.
- Renk, boşluk ve tipografi token üzerinden gelir. Bileşen içine sabit değer yazılmaz.

## Dil

Site iki dilli. **Türkçe varsayılan**, kökte servis edilir. İngilizce `/en` altında.
Yeni bir metin eklenirken iki sözlüğe birden eklenir, tek dilde bırakılmaz.
Sözlük tipleri parite zorunlu tutuyor: biri eksikse derleme kırılır.

### Teknik terim kuralı

Bu kural pazarlığa kapalı.

**Asla çevrilmez.** Koda yazdığın veya Unity, Rider, Visual Studio arayüzünde gördüğün
her şey İngilizce kalır: `Update`, `FixedUpdate`, `LateUpdate`, `Awake`, `OnEnable`,
`Start`, `SerializeField`, `MonoBehaviour`, `Rigidbody`, `Collider`, `Raycast`,
`GameObject`, `Transform`, `Prefab`, `ScriptableObject`, `Coroutine`, `Instantiate`,
`Inspector`, `Hierarchy`, `Canvas`, tip adları, anahtar kelimeler, öznitelikler, menü
adları, paket adları, dosya uzantıları.

**Çevrilir.** Türkçe yazılım dilinde zaten yerleşmiş genel kavramlar: değişken, döngü,
koşul, sınıf, nesne, kalıtım, metot, dizi, hata ayıklama.

**Asla uydurulmaz.** Bir terimin yaygın kullanılan Türkçesi yoksa İngilizcesi kalır.
"Güncelleme fonksiyonu" diye bir şey yok, `Update` vardır. "Katı gövde" diye bir şey
yok, `Rigidbody` vardır.

Ek kesme işaretiyle bağlanır: `Update`'in içinde, `Rigidbody`'ye, `Prefab`'ı.

### Üslup

- Her iki dilde de kusursuz. İngilizcede gramer hatası, Türkçede çeviri kokusu olmaz.
- Hiçbir metin AI yazısı gibi durmaz. Klişe kalıp yok, gereksiz emoji yok, şişirme yok.
- Öğrenciye giden her cümle kısa, net ve insan ağzından.
- Türkçede uzun tire yok. Yerine virgül, iki nokta veya yeni cümle.

## Depo

- Gereksiz dosya tutulmaz. Üretilen çıktı, geçici dosya ve kurulum artığı commit edilmez.
- README projenin ne olduğunu kısaca anlatır. Kurulum ansiklopedisi, özellik listesi
  şişirmesi veya rozet yığını yazılmaz.
- Commit mesajı ne değiştiğini söyler. AI imzası, emoji başlığı, şablon metin yok.
- Sırlar depoya girmez. Firebase yapılandırması ortam değişkeninde durur.

## Kurulu skill'ler

`.claude/skills/` altında 21 skill var. Envanter ve hangisinin ne için olduğu
`docs/BRIEF.md` bölüm 8'de. Tasarım kararı verirken `ui-ux-pro-max`, token üretirken
`design-system`, kod incelerken `code-reviewer`, metin yazarken `content-humanizer` ve
`copy-editing` devreye girer.

## Çalışma biçimi

- Birden çok dosyayı etkileyen değişiklikten önce plan sunulur, onay beklenir.
- "Oldu" demeden önce build, lint veya test çalıştırılır. Çalıştırılamadıysa bu açıkça
  yazılır.
- Kapsam dışına çıkılmaz. Yolda görülen sorun tek satırla bildirilir, izinsiz düzeltilmez.
