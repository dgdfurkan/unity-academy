# Müfredat ve Öğretim Tasarımı

30 ders, 9 modül. Bu dosya derslerin ne öğreteceğini, hangi alıştırma tipleriyle
öğreteceğini ve puanın nasıl işleyeceğini tutuyor. Ders metinlerinin kendisi
beşerli gruplar hâlinde yazılacak.

Unity ve C# tarafındaki her isim İngilizce kalır. `Update`, `Rigidbody`,
`[SerializeField]`, `Prefab` çevrilmez; çevrilen şey etraflarındaki cümledir.

## 1. Neye göre tasarlandı

Video izleyip anladığını sanmak ile kodu yazıp çalıştırmak arasındaki farkı
kapatmak için dört şey yapıyoruz. Bunlar öğrenme araştırmasında en çok işe
yaradığı ölçülmüş yöntemler:

**Önce tahmin, sonra cevap.** Kodu göstermeden önce "sence ne olacak" diye
sorulur. Yanlış tahmin etmek, doğrudan doğruyu okumaktan daha kalıcı öğretiyor,
çünkü kafadaki yanlış modeli görünür kılıyor. Bu yüzden neredeyse her derste bir
tahmin adımı var.

**Hatırlamak, tekrar okumaktan iyi.** Konuyu bir daha okutmak yerine hatırlatan
soru soruyoruz. Alıştırmaların çoğu "şunu tanıdın mı" değil, "şunu üret" biçiminde.

**Örnekten bağımsızlığa.** Önce çalışan bir örnek birlikte yazılır, sonra aynı
örneğin bir kısmı boşaltılır, en sonda öğrenci sıfırdan yazar. Doğrudan "şimdi sen
yaz" demek erken bırakmak oluyor.

**Aralıklı geri getirme.** Bir kavram öğrenildiği derste bitmez; unutma eğrisine
göre 2, 7 ve 21 gün sonra kısa biçimde geri gelir.

**Kanca ile başla.** Her ders bir problem ya da şaşırtıcı bir davranışla açılır,
tanımla değil. `Update` içinde `Time.deltaTime` kullanmayan bir karakterin 30 ve
144 FPS'te farklı hızda gitmesi, "kare hızı bağımsızlığı" tanımından daha çok şey
öğretiyor.

## 2. Ders anatomisi

Her ders aynı yedi adımdan geçer. Adımlar tamamlanmadan sonrakine geçilmez.

| Adım | Süre | Ne olur |
| --- | --- | --- |
| 1. Kanca | ~1 dk | Somut bir problem ya da beklenmedik davranış |
| 2. Tahmin | ~1 dk | Cevabı görmeden önce bir tahmin sorusu |
| 3. Anlatım | 3-6 dk | Kavram; yanında 3B sahne, Inspector görüntüsü ya da diyagram |
| 4. Birlikte yaz | 3-5 dk | Çalışan örnek, satır satır gerekçesiyle |
| 5. Sen yaz | 4-8 dk | Aynı örneğin boşaltılmış hâli, sonra serbest yazım |
| 6. Kontrol | 3-5 dk | 3-5 karışık alıştırma, biri önceki modülden |
| 7. Özet | ~1 dk | Akılda kalacak üç madde + yorum alanı |

Ders başına hedef süre 15-25 dakika. Toplam yaklaşık 9 saatlik çekirdek içerik,
alıştırmalar ve projelerle birlikte 25-30 saate çıkıyor.

## 3. Alıştırma tipleri

Tek tip soru yok. Her tipin öğrettiği şey farklı.

| Tip | Ne yapar | Ne öğretir | Nerede |
| --- | --- | --- | --- |
| `predict` | Kodu gösterir, çalıştırmadan sonucu sorar | Zihindeki modeli sınar | Her derste |
| `inspector` | Sahte bir Inspector; değeri değiştir, sonucu gör | Serileştirme ve `[SerializeField]` | M1, M3, M4 |
| `spot-bug` | Bozuk satırı tıklat | Kod okuma | M1, M2, M7 |
| `fill-blank` | Kelime havuzundan boşluğu doldur | Söz dizimi | M1, M2 |
| `order-lines` | Satırları ya da olayları sıraya diz | `Awake` → `OnEnable` → `Start` sırası | M2, M5 |
| `match` | Kavramı karşılığıyla eşleştir | Terim dağarcığı | Tümü, tekrarlarda |
| `live-code` | Gerçek C# yaz, çalıştır, kontrol et | Üretim | Her modülde |
| `scenario` | Duruma göre doğru aracı seç | Karar verme | M2, M4, M6 |
| `scene-tweak` | 3B sahnede değeri değiştir, sonucu gözle | Uzamsal ve fiziksel sezgi | M3, M4 |
| `perf-audit` | Sorunlu satırları işaretle | Performans gözü | M7 |
| `refactor` | Çalışan ama kötü kodu düzelt | SOLID | M6 |
| `rapid` | Hızlı doğru-yanlış turu | Geri getirme | Tekrar oturumları |

Tasarım kuralları:

- Bir alıştırmada tek kavram sınanır. İki kavram karışınca yanlış cevabın
  nedeni anlaşılmıyor.
- Yanlış şıklar rastgele değil. Her biri yaygın bir yanlış anlamayı temsil eder
  ve seçilince o yanlış anlamayı düzelten geri bildirim çıkar.
- Geri bildirim "Yanlış" demez. Neyin neden olduğunu söyler.
- `live-code` kontrolü çıktı karşılaştırmaz, davranış sınar: metot doğru mu
  çağrıldı, değer doğru mu ölçeklendi, kare hızından bağımsız mı.

## 4. Otuz ders

Süreler çekirdek anlatım içindir; alıştırmalar hariç.

### Modül 0 — Başlangıç (3 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 01 | Unity nedir, ne değildir | Motorun ne yaptığını ve neyi yapmadığını ayırt eder | `Editor`, `Runtime`, `Play Mode` | predict, match | 12 |
| 02 | Editör turu | Altı pencerenin ne işe yaradığını bilir | `Scene`, `Game`, `Hierarchy`, `Inspector`, `Project`, `Console` | match, scenario | 15 |
| 03 | Kod editörü seçmek | Rider, Visual Studio ve VS Code arasında seçim yapar, kurar | `IntelliSense`, `Debugger`, `Breakpoint` | scenario, match | 12 |

### Modül 1 — Aklında kalan C# (5 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 04 | C# nedir, Unity ile ilişkisi | Script'in bir `class` olduğunu ve motorun onu çağırdığını kavrar | `class`, `namespace`, `using` | predict, fill-blank | 14 |
| 05 | Değişkenler ve tipler | `int`, `float`, `bool`, `string` farkını ve `f` ekini bilir | `int`, `float`, `bool`, `string`, `var` | predict, fill-blank, live-code | 18 |
| 06 | public, private ve [SerializeField] | Inspector'da neyin göründüğünü ve neden öyle olduğunu bilir | `public`, `private`, `[SerializeField]`, `[HideInInspector]` | inspector, predict, match | 20 |
| 07 | Koşullar ve döngüler | `if`, `for`, `foreach` yazar; sonsuz döngü tuzağını bilir | `if`, `else`, `for`, `foreach`, `while` | predict, spot-bug, live-code | 20 |
| 08 | Metotlar ve sınıflar | Parametre, dönüş tipi ve `void` ayrımını yapar | `void`, `return`, `parameter`, `field`, `property` | fill-blank, live-code, spot-bug | 22 |

### Modül 2 — Yaşam döngüsü (4 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 09 | MonoBehaviour ve ilk script | Bir script'i GameObject'e bağlar, `Debug.Log` ile doğrular | `MonoBehaviour`, `Debug.Log`, `Component` | live-code, scenario | 16 |
| 10 | Awake, OnEnable, Start | Üçünün sırasını ve hangisinin ne için olduğunu bilir | `Awake`, `OnEnable`, `Start`, `OnDisable` | order-lines, predict, scenario | 20 |
| 11 | Update ve kare hızı | `Time.deltaTime` olmadan kodun neden bozulduğunu gösterir | `Update`, `Time.deltaTime`, `Time.time` | predict, live-code, scene-tweak | 22 |
| 12 | FixedUpdate ve LateUpdate | Fiziği `FixedUpdate`'e, kamerayı `LateUpdate`'e koyar | `FixedUpdate`, `LateUpdate`, `Time.fixedDeltaTime` | scenario, order-lines, live-code | 22 |

### Modül 3 — Sahne ve bileşenler (4 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 13 | GameObject ve Component | Bileşen ekler, `GetComponent` ile erişir, null tuzağını bilir | `GameObject`, `Component`, `GetComponent`, `TryGetComponent` | spot-bug, live-code | 20 |
| 14 | Transform hiyerarşisi | `position` ile `localPosition` farkını gösterir | `Transform`, `position`, `localPosition`, `parent`, `Rotate` | scene-tweak, predict, inspector | 22 |
| 15 | Prefab üretmek | Prefab yapar, örneklerini toplu günceller, override'ı anlar | `Prefab`, `Variant`, `Override`, `Apply` | scenario, match | 18 |
| 16 | Instantiate ve Destroy | Çalışma anında nesne üretir ve temizler | `Instantiate`, `Destroy`, `DontDestroyOnLoad` | live-code, predict | 20 |

### Modül 4 — Fizik (4 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 17 | Rigidbody ve kuvvet | `AddForce`, `velocity` ve `MovePosition` arasında seçim yapar | `Rigidbody`, `AddForce`, `velocity`, `mass`, `drag`, `isKinematic` | scene-tweak, scenario, live-code | 24 |
| 18 | Collider ve trigger | Çarpışma ve trigger olaylarını doğru yerde yakalar | `Collider`, `isTrigger`, `OnCollisionEnter`, `OnTriggerEnter` | match, spot-bug, live-code | 22 |
| 19 | Raycast ile nesne bulmak | Işın atar, `RaycastHit` okur, mesafe sınırlar | `Physics.Raycast`, `RaycastHit`, `Ray`, `maxDistance` | scene-tweak, live-code, predict | 24 |
| 20 | Layer ve collision matrix | Neyin neyle çarpışacağını layer ile ayarlar | `Layer`, `LayerMask`, `Collision Matrix` | inspector, scenario | 18 |

### Modül 5 — Girdi ve oyun döngüsü (3 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 21 | Dokunmatik girdi | Telefonda dokunma ve kaydırma okur | `Input`, `touch`, `Input System`, `Screen` | live-code, scenario | 22 |
| 22 | Oyun durumu | Başlangıç, oynanış ve bitişi tek yerden yönetir | `enum`, `state`, `GameManager` | order-lines, refactor | 22 |
| 23 | Kayıt ve yükleme | İlerlemeyi saklar, geri yükler, bozuk veriye dayanır | `PlayerPrefs`, `JsonUtility`, `Serialization` | live-code, spot-bug | 22 |

### Modül 6 — Üretim desenleri (3 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 24 | Tek sorumluluk | 300 satırlık script'i anlamlı parçalara böler | `Single Responsibility`, `Component` | refactor, scenario | 24 |
| 25 | ScriptableObject ile veri | Veriyi sahneden ayırır, dengeleme yapar | `ScriptableObject`, `CreateAssetMenu`, `Asset` | inspector, live-code | 24 |
| 26 | Event ve observer | Sistemleri birbirine bağlamadan haberleştirir | `event`, `Action`, `UnityEvent`, `subscribe` | refactor, spot-bug, live-code | 26 |

### Modül 7 — Telefonda performans (2 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 27 | Update içine ne yazılmaz | `GetComponent`, `Find` ve `Camera.main` çağrılarını döngüden çıkarır | `Update`, `GameObject.Find`, `Camera.main`, `cache` | perf-audit, refactor, predict | 24 |
| 28 | Pooling, allocation ve profil | Nesne havuzu kurar, çöp üretimini ölçer, `Profiler` okur | `Object Pooling`, `Allocation`, `GC`, `Draw Call`, `Profiler` | perf-audit, live-code | 26 |

### Modül 8 — Araçlar ve yayın (2 ders)

| # | Ders | Kazanım | Terimler | Tipler | Dk |
| --- | --- | --- | --- | --- | --- |
| 29 | Package Manager ve DOTween | Paket ekler, bağımlılığın maliyetini ölçer, tween yazar | `Package Manager`, `DOTween`, `Tween`, `Ease` | scenario, live-code | 22 |
| 30 | Build ayarları ve yayın | Android ve iOS hedefine build alır, reklam ve analytics'i yerleştirir | `Build Settings`, `Player Settings`, `IL2CPP`, `SDK` | scenario, match | 24 |

## 5. Puanlama

Puan, harcanan zamanı değil öğrenilen şeyi ödüllendirir.

| Kaynak | Puan |
| --- | --- |
| Ders tamamlama | 20 |
| Alıştırma, ilk denemede doğru | 10 |
| Alıştırma, ikinci denemede doğru | 6 |
| Alıştırma, üçüncü ve sonrası | 3 |
| Tekrar sorusu doğru | 5 |
| Modül bitirme | 50 |
| Proje teslimi | 150 |

Kurallar:

- Yanlış cevap puan eksiltmez. Ceza, denemekten caydırıyor.
- İpucu kullanmak o alıştırmanın puanını yarıya indirir, sıfırlamaz.
- Aynı alıştırma tekrar çözülünce puan vermez; tekrar oturumundaki soru ayrı sayılır.
- Seri, puan vermez. Seri ayrı bir gösterge: gün bazlı, kaçırılınca sıfırlanır
  ve bir günlük telafi hakkı vardır.

## 6. Aralıklı tekrar

Her kavram bir `concept` kaydına bağlanır. Ders bitince o dersin kavramları
tekrar kuyruğuna girer.

| Doğru sayısı | Sonraki tekrar |
| --- | --- |
| 1 | 2 gün sonra |
| 2 | 7 gün sonra |
| 3 | 21 gün sonra |
| 4 | 60 gün sonra |

Yanlış cevap aralığı bir kademe geri alır, sıfıra düşürmez. Tekrar oturumu en
fazla 8 soru ve 3 dakika; uzun tutulunca atlanıyor. Sorular `rapid`, `match` ve
`predict` tiplerinden seçilir, `live-code` tekrarda kullanılmaz.

## 7. Ders altı yorumlar

Her dersin altında bir yorum alanı var. Öğrenci takıldığı yeri sorar, eğitmen
cevaplar, cevap diğer öğrencilere de kalır.

- Yorumlar ders bazında. Alıştırma bazında değil: konu dağılıyor.
- Kod bloğu yazılabilir, söz dizimi renklenir.
- Eğitmen cevabı işaretlenir ve listenin üstünde durur.
- Öğrenci kendi yorumunu düzenleyebilir ve silebilir; başkasınınkine dokunamaz.
- Bildirim: eğitmen yeni soruyu, öğrenci kendi sorusuna gelen cevabı görür.
- Yeni yorum eklendiğinde liste zıplamaz; yeni öğe yerinde belirir.

## 8. Veri modeli taslağı

Firestore koleksiyonları. Erişim kontrolü Security Rules ile kurulacak.

```
courses/{courseId}
  modules/{moduleId}            sıra, başlık anahtarı
    lessons/{lessonId}          sıra, süre, kavram listesi
      exercises/{exerciseId}    tip, soru, şıklar, doğru cevap, geri bildirim
      comments/{commentId}      yazar, metin, tarih, eğitmen mi

users/{userId}                  ad, kullanıcı adı, rol
  progress/{lessonId}           durum, deneme, puan, tamamlanma
  reviews/{conceptId}           kademe, sonraki tarih
  submissions/{projectId}       teslim, not, eğitmen yorumu
```

Kurallar:
- Öğrenci yalnızca kendi `users/{userId}` alt ağacını okur ve yazar.
- Ders ve alıştırma içeriği herkese okunur, yalnızca eğitmen yazar.
- Doğru cevap alanı istemciye gitmez: kontrol Cloud Function ile yapılır,
  yoksa cevaplar ağ sekmesinden okunur.
- Yorumlar giriş yapmış herkese okunur; yazarı yalnızca kendi yorumunu düzenler.

## 9. Yazım sırası

Beşerli gruplar. Her grup bitince o beş ders uçtan uca oynanabilir olacak.

| Grup | Dersler | Neden bu sıra |
| --- | --- | --- |
| 1 | 01-05 | Ders motorunu ve ilk üç alıştırma tipini kurar |
| 2 | 06-10 | `inspector` ve `order-lines` tiplerini ekler |
| 3 | 11-15 | `scene-tweak` ile 3B modülü devreye alır |
| 4 | 16-20 | Fizik sahneleri, en çok görsel gerektiren grup |
| 5 | 21-25 | `refactor` tipi ve proje teslimi |
| 6 | 26-30 | `perf-audit` ve yayın; kurs tamamlanır |

Her gruptan önce o gruptaki yeni alıştırma tipi bileşeni yazılır, sonra içerik
doldurulur. İçerik önce yazılıp tip sonra yapılırsa içerik iki kez elden geçiyor.
