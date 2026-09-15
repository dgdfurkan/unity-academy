# CLAUDE.md

Unity ve C# öğreten interaktif kurs platformu. Açık bir ürün: birden çok öğrenci kayıt
olur, modülleri kendi hızında ilerletir. Tek kişiye özel bir ders sayfası değil.
Kapsam ve yol haritası için `docs/BRIEF.md`, arayüz kararları için `docs/DESIGN.md`,
ders planı ve öğretim tasarımı için `docs/CURRICULUM.md`, ilk grubun ayrıntılı
tasarımı için `docs/LESSONS-01-08.md`.
Bu dosya çalışma kurallarını tutar.

## Mimari kısıtlar

- Frontend GitHub Pages üzerinde **statik** yayınlanır. Sunucu tarafı render, API route
  veya çalışma anında Node gerektiren hiçbir şey frontend'e girmez.
- Dinamik her şey tarayıcıdan Firebase SDK ile konuşur. Auth, Firestore, Storage.
- Erişim kontrolü Security Rules ile kurulur. Arayüzde bir kontrolü gizlemek güvenlik
  değildir; kural yazılmadan koleksiyon açılmaz.
- İki rol var: `instructor` ve `student`. Hesapları yalnızca eğitmen açar, açık kayıt yok.
- Giriş kullanıcı adıyla yapılır. Firebase Authentication bunu doğrudan desteklemediği
  için kullanıcı adı önce hesaba çözülür; `AuthClient` arayüzü bunu gizler.
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
- `px-safe`, `pt-safe`, `pb-safe` taban boşluğu bir değişkenden alır
  (`px-safe [--gx:1rem]`). Aynı elemana `px-safe` ile `px-4` birlikte yazılmaz:
  stylesheet'te sonra gelen diğerini eziyor ve boşluk sıfıra düşüyor.
- Her `grid`'e taban sütun sayısı yazılır (`grid-cols-1`). Yalnızca `lg:grid-cols-*`
  yazılırsa mobildeki örtük sütun `auto` boyutlanır, içindeki en geniş öğenin
  min-content genişliğine şişer ve sayfayı viewport dışına taşırır. İki kez bu
  yüzden mobil düzen kırıldı.

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

## Ders içeriği

- Ders metinleri `src/content/lessons/` altında, iki dil yan yana (`{ tr, en }`).
  Yapı pariteyi zorunlu tutuyor: bir dilde eksik bırakınca derleme kırılıyor.
- Yazılmamış ders gizlenmiyor. Yolda "Yakında" olarak görünüyor ve sayfası
  durumu açıkça söylüyor. Kilitli ders ile yazılmamış ders ayrı durumlar.
- Alıştırmalarda yanlış şıklar rastgele değil: her biri bir yanlış anlamayı
  temsil eder ve seçilince onu düzelten geri bildirim çıkar.
- Öğrenci ilerlemesi uydurulmaz. Herkes sıfırdan başlar.
- Bir kavram canlı simülasyonla gösterilebiliyorsa paragrafla anlatılmaz.
  Her derste en az iki simülasyon bulunur; öğrenci sistemi kapatır, değeri
  değiştirir, sonucu kendi gözüyle görür.
- Örnekler gerçek oyunlardan verilir: mermi ve can, jeton ve sayaç, zıplama
  yüksekliği. Soyut örnek yok.
- Ders metni tam cümlelerle yazılır. Devrik cümle, slogan, yarım cümle yok.
- Bir metin adımı en fazla üç dört cümledir ve ardından mutlaka bir etkinlik
  gelir. Arka arkaya iki metin adımı yazılmaz.
- Bir derste 12-18 adım bulunur. Beş büyük bölüm değil, çok sayıda küçük vuruş.
- Hedef kitle hiçbir şey bilmiyor. Terimler ilk geçtikleri yerde tanıtılır;
  ilk derste Unity'ye özel isim kullanılmaz.

## Çalışma biçimi

- Birden çok dosyayı etkileyen değişiklikten önce plan sunulur, onay beklenir.
- "Oldu" demeden önce build, lint veya test çalıştırılır. Çalıştırılamadıysa bu açıkça
  yazılır.
- Kapsam dışına çıkılmaz. Yolda görülen sorun tek satırla bildirilir, izinsiz düzeltilmez.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
