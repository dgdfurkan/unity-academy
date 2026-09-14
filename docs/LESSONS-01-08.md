# İlk Beş Saat: Ders 01-08

Modül 0 (Başlangıç) ve Modül 1 (Aklında Kalan C#). Çekirdek anlatım 133 dakika,
alıştırmalarla birlikte yaklaşık 5 saat.

Bu dosya derslerin nasıl işleneceğini adım adım tutuyor: kanca cümlesi, tahmin
sorusunun tam metni, anlatım başlıkları, yazılacak kod, alıştırmaların şıkları ve
her yanlış şıkkın hangi yanlış anlamayı hedeflediği.

Ders anatomisi, alıştırma tipleri ve sapma mekanizmaları için `docs/CURRICULUM.md`.

Unity ve C# isimleri hiçbir yerde çevrilmez.

---

## Ders 01 — Unity Nedir, Ne Değildir?

**Kazanım.** Motorun ne yaptığını, kendisinin ne yazacağını ayırt eder.
`Edit Mode` ile `Play Mode` farkını bilir.
**Süre.** 12 dk anlatım + 8 dk alıştırma · **Puan.** 20 + alıştırmalar
**Kavramlar.** `engine-vs-game`, `edit-vs-play-mode`

### Kanca

Ekranda bir küp havada duruyor. Play'e basılıyor, küp düşüyor ve zemine çarpıp
duruyor. Alt yazı: *bu küpün düşmesini kimse koda yazmadı.*

Sorulan soru: motor bunu kendiliğinden yaptıysa, geriye sana ne kalıyor?

### Tahmin

> Aşağıdakilerden hangilerini Unity sen kod yazmadan yapar?
>
> - [x] İki nesnenin çarpıştığını hesaplamak
> - [x] Sahneyi ekrana çizmek
> - [ ] Çarpışınca canın azalmasına karar vermek
> - [ ] Hangi seviyenin ne zaman açılacağını belirlemek

Yanlış işaretlenen her seçenek için geri bildirim, o işin neden oyuna ait
olduğunu tek cümleyle söyler.

### Anlatım

1. **Motorun yaptığı işler.** Çizim, fizik, girdi okuma, ses, derleme ve
   platforma paketleme. Bunlar her oyunda aynı; her seferinde yeniden yazılmaz.
2. **Senin yaptığın iş.** Kurallar. Neyin ne zaman olacağı, neyin kaç puan
   getireceği, oyunun ne zaman biteceği.
3. **Unity ne değildir.** Bir çizim programı değil, bir oyun şablonu değil,
   "tıkla oyun çıksın" aracı değil. Modeli ve sesi başka araçlarla üretip
   buraya getirirsin.
4. **`Edit Mode` ve `Play Mode`.** Editörde kurarsın, Play'de denersin. Play
   sırasında yaptığın her değişiklik Play'den çıkınca kaybolur. Bu, yeni
   başlayanın en çok kaybettiği saattir.

Görsel: soldaki sütunda motorun işleri, sağdakinde senin işlerin; ortadaki
`Play` düğmesine basılınca sahne canlanıyor.

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `match` | Altı işi "motor yapar" ve "sen yazarsın" kutularına ayır | — | Fizik ve çizimi oyun mantığından ayırmak |
| 2 | `predict` | Play Mode'dayken Inspector'da `speed` değerini 5'ten 12'ye çektin, sonra Play'den çıktın. `speed` kaç? | 5 | "Değişiklikler kaydedilir" yanılgısı |
| 3 | `scenario` | Karakterin zıplama yüksekliğini kalıcı değiştirmek istiyorsun. Ne yaparsın? | Play'den çık, sonra değiştir | Play sırasında ayar yapma alışkanlığı |

### Özet

- Motor çizer, hesaplar ve paketler. Kuralları sen yazarsın.
- Unity bir araç; içerik ve tasarım senden gelir.
- `Play Mode`'da yapılan değişiklik Play bitince silinir.

---

## Ders 02 — Editör Turu: Altı Pencere

**Kazanım.** Altı pencerenin ne işe yaradığını bilir; `Hierarchy` ile `Project`
ayrımını yapar; `Console`'daki bir hatayı okur.
**Süre.** 15 dk + 10 dk · **Puan.** 20 + alıştırmalar
**Kavramlar.** `editor-windows`, `hierarchy-vs-project`, `console-basics`
**Sapma.** `detour: Konsol Hatalarını Okumak`

### Kanca

Bir öğrenci `Hierarchy`'den küpü siliyor, Play'e basıyor, küp hâlâ orada.
Bir başkası `Project`'ten bir dosyayı siliyor, sahnedeki her şey bozuluyor.

İkisi de aynı yanılgının iki ucu: sahnedeki nesne ile diskteki dosya aynı şey
değil.

### Tahmin

> `Hierarchy`'deki bir `GameObject`'i sildin. `Project` klasöründeki dosyalara
> ne olur?
>
> - [x] Hiçbir şey olmaz
> - [ ] İlgili dosya da silinir
> - [ ] Dosya çöp kutusuna gider
> - [ ] Unity sorar

### Anlatım

| Pencere | Ne için | Yeni başlayanın hatası |
| --- | --- | --- |
| `Scene` | Sahneyi kurarsın | Play sırasında burada düzenlemek |
| `Game` | Oyuncunun gördüğü | Scene ile karıştırmak |
| `Hierarchy` | Bu sahnedeki nesneler | Diskteki dosyalarla aynı sanmak |
| `Inspector` | Seçili nesnenin ayarları | Seçim değişince panelin değiştiğini fark etmemek |
| `Project` | Diskteki tüm varlıklar | Buradan silmenin geri dönüşü olmadığını bilmemek |
| `Console` | Motorun sana söyledikleri | Hatayı okumadan kapatmak |

Kritik ayrım, görselle: `Project`'teki bir `Prefab` bir kalıp; `Hierarchy`'deki
her kopya o kalıptan üretilmiş bir örnek. Kalıbı silersen örnekler bozulur,
örneği silersen kalıp durur.

`Console` üç şey gösterir: `Log` (bilgi), `Warning` (dikkat), `Error` (çalışmaz).
Bir hata satırı dört parçadan oluşur: mesaj, dosya adı, satır numarası, çağrı
yığını. Satıra çift tıklamak kod editörünü o satırda açar.

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `match` | Altı pencereyi işleriyle eşleştir | — | Panel işlevlerini karıştırmak |
| 2 | `scenario` | Bir materyalin rengini değiştireceksin. Hangi pencerede seçersin, hangisinde değiştirirsin? | Project'te seç, Inspector'da değiştir | Seçim ve düzenlemeyi ayıramamak |
| 3 | `spot-bug` | Verilen `Console` hatasında dosya adını ve satır numarasını tıklat | `PlayerMove.cs:23` | Hata metnini bütün olarak görüp okumamak |
| 4 | `predict` | `Project`'ten bir `Prefab`'ı sildin. Sahnedeki üç örneğine ne olur? | Bozulur, "Missing Prefab" olur | Kalıp-örnek ilişkisini tersine kurmak |

### Özet

- `Hierarchy` sahneyi, `Project` diski gösterir. Aynı şey değiller.
- `Inspector` her zaman seçili olan nesneyi gösterir.
- `Console`'daki kırmızı satır okunmadan kapatılmaz.

---

## Ders 03 — Hangi Kod Editörü? Rider, Visual Studio, VS Code

**Kazanım.** Üç editörün farkını bilir, birini seçip Unity'ye bağlar, kod
tamamlama ve `Breakpoint` kavramlarını tanır.
**Süre.** 12 dk + 8 dk · **Puan.** 20 + alıştırmalar
**Kavramlar.** `external-editor`, `intellisense`, `breakpoint`

### Kanca

Aynı yazım hatası üç ekranda: birinde yazarken kırmızı çizgi çıkıyor, birinde
kaydedince, birinde hiç çıkmıyor ve hata ancak Unity'de Play'e basınca
`Console`'a düşüyor.

### Tahmin

> Unity projesindeki C# kodunu kim derler?
>
> - [x] Unity
> - [ ] Rider
> - [ ] Visual Studio
> - [ ] İşletim sistemi

Geri bildirim: editör yazmanı kolaylaştırır ve hataları önceden gösterir, ama
derleyen taraf Unity'dir. Editörü değiştirmek oyunu değiştirmez.

### Anlatım

1. **Editörün sana verdiği dört şey.** `IntelliSense` (yazarken tamamlama),
   hata altı çizgisi, `Go to Definition`, `Debugger` ve `Breakpoint`.
2. **Karşılaştırma.**

   | | Rider | Visual Studio | VS Code |
   | --- | --- | --- | --- |
   | Unity entegrasyonu | En güçlü | Güçlü | Eklenti ile |
   | Hız ve bellek | Ağır | Orta | Hafif |
   | Fiyat | Ücretli, öğrenciye ücretsiz | Community ücretsiz | Ücretsiz |
   | Öneri | Uzun vadede | Windows'ta hızlı başlangıç | Hafif makinede |

3. **Bağlama.** `Edit > Preferences > External Tools > External Script Editor`.
   Seçtikten sonra `Regenerate project files`.
4. **İlk `Breakpoint`.** Satırın soluna tıkla, Unity'ye `Attach` ol, Play'e bas.
   Kod o satırda durur ve değişkenlerin o andaki değerini görürsün.
   `Debug.Log` ile fark: `Breakpoint` zamanı durdurur, `Log` sadece yazar.

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `scenario` | 8 GB RAM'li bir dizüstünde çalışıyorsun ve editör sürekli takılıyor. Ne seçersin? | VS Code | "Pahalı olan her zaman iyidir" |
| 2 | `match` | `IntelliSense`, `Breakpoint`, `Go to Definition`, `Console` ne işe yarar | — | Editör ile motorun işlerini karıştırmak |
| 3 | `scenario` | Bir değişkenin değerini çalışma anında görmek istiyorsun ama nereye `Log` koyacağını bilmiyorsun | `Breakpoint` koy | Her şeyi `Debug.Log` ile çözme alışkanlığı |

### Özet

- Editör yazar ve uyarır; derleyen Unity'dir.
- Seçim makineye ve bütçeye göre yapılır, üçü de işi görür.
- `Breakpoint` zamanı durdurur, `Debug.Log` sadece yazar.

---

## Ders 04 — C# Nedir, Unity Onu Nasıl Çalıştırır?

**Kazanım.** Bir script'in `class` olduğunu, Unity'nin belirli isimdeki metotları
kendisinin çağırdığını kavrar. İlk script'ini yazıp `Console`'a mesaj bastırır.
**Süre.** 14 dk + 10 dk · **Puan.** 20 + alıştırmalar
**Kavramlar.** `class-basics`, `using-directive`, `unity-calls-you`

### Kanca

Yeni bir C# script'i açılıyor. İçinde `Main` yok. Ekranda soru:
*Program `Main` ile başlar diye öğrenmiştin. Peki bu nasıl çalışıyor?*

### Tahmin

> Aşağıdaki script bir `GameObject`'e eklenmedi. Play'e basınca ne olur?
>
> ```csharp
> public class Greeter : MonoBehaviour
> {
>     private void Start()
>     {
>         Debug.Log("Merhaba");
>     }
> }
> ```
>
> - [x] Hiçbir şey olmaz, `Console` boş kalır
> - [ ] "Merhaba" yazar
> - [ ] Hata verir
> - [ ] Unity script'i otomatik ekler

### Anlatım

1. **Script bir `class`.** Bir isim ve içinde alanlar ile metotlar. Dosya adı ile
   `class` adı aynı olmak zorunda; değilse Unity bileşeni ekleyemez.
2. **Ters çağrı.** Sen Unity'yi çağırmazsın, Unity seni çağırır. `Start`,
   `Update` gibi isimleri motor tanır ve zamanı gelince çalıştırır. Bu yüzden
   `Main` yok.
3. **`MonoBehaviour`.** Bir script'in `GameObject`'e bileşen olarak eklenebilmesi
   bu mirastan gelir. `MonoBehaviour`'dan türemeyen bir `class` de yazılabilir,
   ama sahneye eklenemez.
4. **`using UnityEngine;`.** `Debug`, `Vector3`, `GameObject` gibi isimler bu
   `namespace` içinde. Satır silinirse hepsi bulunamaz.

### Birlikte yaz

```csharp
using UnityEngine;

public class Greeter : MonoBehaviour
{
    private void Start()
    {
        Debug.Log("İlk script çalıştı");
    }
}
```

Satır satır: `using` neyi getirir, `public class` ne tanımlar, `: MonoBehaviour`
ne kazandırır, `private void Start()` neden `private` olabilir (Unity `private`
metotları da çağırır, çünkü isimle arar).

### Sen yaz

Boşaltılmış hâlde `using` satırı ve `Start` gövdesi silinmiş verilir. Öğrenci
tamamlar ve kendi mesajını bastırır.

Kontrol: `Console`'da beklenen metin çıkıyor mu, `using` satırı var mı.

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `fill-blank` | Eksik `using` satırını tamamla | `using UnityEngine;` | `System` ile karıştırmak |
| 2 | `spot-bug` | Dosya adı `Player.cs`, `class` adı `PlayerController`. Hangi satır sorunlu? | `class` satırı | Dosya adı ile sınıf adı bağını bilmemek |
| 3 | `predict` | `Start` metodunu `private` yerine `public` yaptın. Ne değişir? | Unity açısından hiçbir şey | "Unity yalnızca `public` metotları görür" yanılgısı |
| 4 | `live-code` | `Awake` içinde kendi adını bastır | — | — |

### Özet

- Script bir `class`; dosya adı ile aynı adı taşır.
- Sen motoru değil, motor seni çağırır.
- `using UnityEngine;` olmadan Unity isimleri bulunamaz.

---

## Ders 05 — Değişkenler ve Tipler: int, float, bool, string

**Kazanım.** Dört temel tipi ayırt eder, `f` ekinin nedenini bilir, tamsayı
bölmesi tuzağına düşmez, değerleri Inspector'da görür.
**Süre.** 18 dk + 12 dk · **Puan.** 20 + alıştırmalar
**Kavramlar.** `value-types`, `int-division`, `float-suffix`
**Sapma.** `aside: Neden double değil de float?`

### Kanca

```csharp
float speed = 8;    // sorun yok
float speed = 8.5;  // kırmızı çizgi
```

*Aynı tip, aynı satır. Biri neden kızıyor?*

### Tahmin

> ```csharp
> int health = 100;
> int result = health / 3;
> ```
>
> `result` kaç olur?
>
> - [x] 33
> - [ ] 33.33
> - [ ] 34
> - [ ] Hata verir

Geri bildirim: `int / int` işleminin sonucu da `int`'tir. Ondalık kısım
yuvarlanmaz, atılır. Bu, can ve hasar hesabında en sık görülen sessiz hatadır.

### Anlatım

1. **Tip nedir.** Bellekte ne tutulduğu ve hangi işlemlerin geçerli olduğu.
2. **Dört temel tip.**

   | Tip | Tutar | Örnek | Unity'de nerede |
   | --- | --- | --- | --- |
   | `int` | Tam sayı | `int score = 120;` | Puan, can, sayaç |
   | `float` | Ondalıklı sayı | `float speed = 8.5f;` | Hız, süre, mesafe |
   | `bool` | İki durum | `bool isAlive = true;` | Anahtarlar |
   | `string` | Metin | `string name = "Deniz";` | İsim, etiket |

3. **`f` eki.** C#'ta ondalık sabitler varsayılan olarak `double`'dır. `8.5` bir
   `double`; `float`'a sığdırmak için `8.5f` yazılır. Unity `float` kullanır
   çünkü oyunlarda hassasiyetten çok hız gerekir.
4. **Tamsayı bölmesi.** `7 / 2` sonucu `3`. `7f / 2f` sonucu `3.5f`.
5. **`var` ne zaman.** Sağ taraf tipi açıkça belli ediyorsa okunurluğu artırır;
   `var x = 5;` gibi belirsiz yerlerde tip yazmak daha iyi.

### Birlikte yaz

```csharp
using UnityEngine;

public class PlayerStats : MonoBehaviour
{
    public int health = 100;
    public float moveSpeed = 8.5f;
    public bool isAlive = true;
    public string playerName = "Deniz";

    private void Start()
    {
        Debug.Log(playerName + " başladı. Can: " + health);
    }
}
```

### Sen yaz

Verilen değerlere doğru tipleri seçtirip alanları yazdırır. Kontrol, her alanın
tipini ve `f` ekini sınar.

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `predict` | `int damage = 7 / 2;` → `damage` kaç? | 3 | Otomatik ondalık beklentisi |
| 2 | `fill-blank` | `float gravity = -9.81__;` | `f` | `f` ekini gereksiz sanmak |
| 3 | `inspector` | Inspector'daki `health` alanına `12.7` yaz, ne olur | `12` olur | Tipin Inspector'ı da bağladığını bilmemek |
| 4 | `live-code` | Canın yarısını `float` olarak hesapla ve bastır | `health / 2f` | Tamsayı bölmesi |
| 5 | `match` | Dört tipi kullanım yerleriyle eşleştir | — | — |

### Özet

- `int` tam sayı tutar; `int / int` sonucu da tam sayıdır.
- Ondalık sabitin sonuna `f` gelir, yoksa `double` olur.
- Tip, değerin ne olduğunu değil, onunla ne yapabileceğini belirler.

---

## Ders 06 — public, private ve [SerializeField]

**Kazanım.** Erişim belirleyici ile serileştirmenin ayrı şeyler olduğunu kavrar.
Inspector değerinin koddaki başlangıç değerini ezdiğini bilir.
**Süre.** 20 dk + 14 dk · **Puan.** 20 + alıştırmalar
**Kavramlar.** `access-modifiers`, `serialization`, `inspector-overrides-code`

Bu, kursun en çok "demek oymuş" anı. Ayrıntılı işlenir.

### Kanca

Üç script yan yana, üçünde de aynı alan:

```csharp
public float speed = 8f;                  // Inspector'da var
private float speed = 8f;                 // Inspector'da yok
[SerializeField] private float speed = 8f; // Inspector'da var
```

*Üçüncüsü ilkiyle aynı görünüyor. Farkı ne?*

### Tahmin

> `[SerializeField] private float speed;` alanı için hangileri doğru?
>
> - [x] Inspector'da görünür
> - [ ] Başka bir script'ten `other.speed` ile okunabilir
> - [x] Unity değeri sahne dosyasına kaydeder
> - [ ] `public` ile tamamen aynı şeydir

### Anlatım

1. **İki ayrı soru.** "Bu alana başka kod erişebilir mi" ile "Unity bu alanı
   kaydedip gösterir mi" farklı sorular. Biri C#'a, öteki Unity'ye ait.
2. **Erişim belirleyici.** `private` yalnızca kendi `class`'ı içinden;
   `public` her yerden. Varsayılan `private`'tır ve öyle kalmalıdır: dışarıya
   açılan her alan, ileride birinin bozabileceği bir yüzeydir.
3. **Serileştirme.** Unity bir alanı serileştirirse değerini sahne ya da prefab
   dosyasına yazar ve Inspector'da gösterir. `public` alanlar varsayılan olarak
   serileşir, `private` alanlar serileşmez.
4. **`[SerializeField]`.** Alanı `private` bırakıp Unity'ye serileştirmesini
   söyler. İstenen davranış budur: tasarımcı Inspector'dan ayarlar, kod dışarıya
   kapalı kalır.
5. **`[HideInInspector]`.** Tersi: `public` ama Inspector'da gizli.
6. **En kritik davranış.** Inspector'daki değer, koddaki başlangıç değerini
   **ezer**. Kodda `8f` yazıp Inspector'da `3` görüyorsan, sahnede kayıtlı olan
   `3`'tür. Kodu değiştirmek o nesnenin değerini değiştirmez.
7. **Ne zaman ne.**

   | Durum | Seçim |
   | --- | --- |
   | Tasarımcı ayarlayacak, kod dışarı açılmasın | `[SerializeField] private` |
   | Başka script okuyacak | `public` property ya da metot |
   | Çalışma anında hesaplanıyor, kaydedilmesin | `private` |
   | `public` ama Inspector'ı kirletmesin | `[HideInInspector] public` |

### Inspector simülasyonu

Sahte bir Inspector. Öğrenci `speed` değerini `3` yapar. Sonra kod panelindeki
başlangıç değeri `8f`'ten `20f`'e çekilir. Soru: sahnedeki nesnenin `speed`
değeri kaç? Cevap verildikten sonra simülasyon gerçek sonucu gösterir: `3`.

Ardından "Reset" ile bileşen sıfırlanır ve değerin `20` olduğu görülür.

### Birlikte yaz

```csharp
using UnityEngine;

public class Mover : MonoBehaviour
{
    [SerializeField] private float speed = 8f;
    [SerializeField] private bool canMove = true;

    private float travelled;   // serileşmez, çalışma anında hesaplanır

    private void Start()
    {
        Debug.Log($"Hız {speed}, hareket {(canMove ? "açık" : "kapalı")}");
    }
}
```

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `inspector` | Kodda `10f`, Inspector'da `4`. Play'e basınca hangi değer geçerli? | 4 | "Kod her zaman kazanır" |
| 2 | `predict` | `private float speed` alanını Inspector'da arıyorsun, yok. Neden? | Serileşmiyor | Erişim ile görünürlüğü aynı sanmak |
| 3 | `match` | Dört durumu doğru belirleyiciyle eşleştir | — | — |
| 4 | `live-code` | Bir alanı Inspector'da göster ama koda kapalı tut | `[SerializeField] private` | `public` refleksi |
| 5 | `predict` | `[HideInInspector] public int score;` başka script'ten erişilir mi? | Evet | Gizlemeyi kapatma sanmak |

### Özet

- Erişim belirleyici kodu, serileştirme Inspector'ı ilgilendirir.
- Varsayılan `[SerializeField] private`'tır; `public` istisnadır.
- Inspector'daki değer koddaki başlangıç değerini ezer.

---

## Ders 07 — Koşullar ve Döngüler

**Kazanım.** `if`, `for`, `foreach` yazar; `=` ile `==` karışıklığını tanır;
Unity'de sonsuz döngünün editörü kilitlediğini bilir.
**Süre.** 20 dk + 12 dk · **Puan.** 20 + alıştırmalar
**Kavramlar.** `conditionals`, `loops`, `infinite-loop-danger`

### Kanca

Play'e basılıyor, Unity donuyor. Play'den çıkılamıyor, pencere kapanmıyor.
Sebep üç satır:

```csharp
int i = 0;
while (i < 10)
{
    Debug.Log(i);   // i hiç artmıyor
}
```

### Tahmin

> ```csharp
> for (int i = 0; i < 3; i++)
> {
>     Debug.Log(i);
> }
> ```
>
> Kaç satır yazar ve en son yazılan sayı kaçtır?
>
> - [x] 3 satır, son sayı 2
> - [ ] 3 satır, son sayı 3
> - [ ] 4 satır, son sayı 3
> - [ ] 2 satır, son sayı 2

### Anlatım

1. **`if` ve arkadaşları.** `if`, `else if`, `else`. Karşılaştırma operatörleri
   `==`, `!=`, `<`, `>`, `<=`, `>=`. `=` atama, `==` karşılaştırma; bu ayrım
   yeni başlayanın en sık hatası.
2. **Mantık operatörleri.** `&&`, `||`, `!`. Kısa devre: `a && b` içinde `a`
   yanlışsa `b` hiç çalıştırılmaz. Bu, `null` kontrolünde işe yarar.
3. **`for`.** Sayaçla dönmek. Üç parça: başlangıç, koşul, artış.
4. **`foreach`.** Koleksiyonun her öğesi için. Sayaç gerekmiyorsa tercih edilir.
5. **`while`.** Koşul bozulana kadar. Unity'de tehlikeli: koşul hiç bozulmazsa
   bir kare hiç bitmez ve editör kilitlenir. Çıkış yolu: görev yöneticisinden
   kapatmak, yani kaydedilmemiş her şeyi kaybetmek.

### Birlikte yaz

```csharp
private void CheckHealth()
{
    if (health <= 0)
    {
        Debug.Log("Oyun bitti");
    }
    else if (health < 30)
    {
        Debug.Log("Can azaldı");
    }
}

private void ListEnemies()
{
    foreach (string enemy in enemies)
    {
        Debug.Log(enemy + " sahnede");
    }
}
```

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `spot-bug` | `if (health = 0)` satırındaki hatayı bul | `=` yerine `==` | Atama ile karşılaştırmayı karıştırmak |
| 2 | `predict` | `for (int i = 3; i > 0; i--)` kaç kez döner | 3 | Geri sayan döngüyü çözememek |
| 3 | `order-lines` | Dağıtılmış `if / else if / else` satırlarını doğru sıraya diz | — | Genel koşulu özel koşuldan önce yazmak |
| 4 | `live-code` | Listedeki sayıların yalnızca çiftlerini bastır | `% 2 == 0` | — |
| 5 | `predict` | `while (true)` içinde `break` yoksa Unity'de ne olur | Editör donar | "Motor beni kurtarır" beklentisi |

### Özet

- `=` atar, `==` karşılaştırır.
- `for` sayaçla, `foreach` koleksiyonla döner.
- `while` koşulu bozulmuyorsa Unity donar; koşulu değiştiren satırı unutma.

---

## Ders 08 — Metotlar ve Sınıflar

**Kazanım.** Tekrar eden kodu metoda çıkarır; parametre ve dönüş tipini doğru
kurar; `void` içinde `return`'ün ne işe yaradığını bilir.
**Süre.** 22 dk + 14 dk · **Puan.** 20 + alıştırmalar
**Kavramlar.** `methods`, `parameters`, `scope`, `refactor-extract`

### Kanca

80 satırlık bir `Update`. İçinde aynı altı satır üç kez tekrar ediyor. Hasar
hesabı değişecek; üç yerde birden değiştirmek gerekiyor ve biri unutuluyor.

### Tahmin

> Dönüş tipi `void` olan bir metodun içinde `return;` yazılabilir mi?
>
> - [x] Evet, metottan erken çıkmak için
> - [ ] Hayır, `void` metot `return` alamaz
> - [ ] Sadece `return null;` yazılabilir
> - [ ] Derlenir ama çalışmaz

### Anlatım

1. **Metot nedir.** İsimlendirilmiş bir iş. Adı ne yaptığını söyler:
   `TakeDamage`, `Jump`, `SpawnEnemy`.
2. **Parametre.** Metodun dışarıdan aldığı bilgi.
   `TakeDamage(int amount)`. Parametre yoksa metot her seferinde aynı şeyi yapar.
3. **Dönüş tipi.** `void` bir şey döndürmez; `int`, `bool`, `float` döndürür.
   `void` içinde `return;` erken çıkıştır, sık kullanılır:

   ```csharp
   private void TakeDamage(int amount)
   {
       if (!isAlive) return;   // ölüyse devam etme
       health -= amount;
   }
   ```

4. **Kapsam.** Metot içinde tanımlanan değişken dışarıdan görünmez. Alan (field)
   `class` düzeyinde, yerel değişken metot düzeyindedir.
5. **Çıkarma (extract).** Tekrar eden bloğu seç, bir metoda taşı, üç yerden
   çağır. Değişiklik artık tek yerde yapılır.
6. **Adlandırma.** Metot adı fiil olur. `Health()` değil `TakeDamage()`;
   `PlayerStuff()` değil `ResetPlayer()`.

### Birlikte yaz

Önce kötü hâli gösterilir, sonra birlikte çıkarılır:

```csharp
// Öncesi: aynı iş üç yerde
health -= 10;
if (health < 0) health = 0;
healthBar.SetValue(health);

// Sonrası
private void TakeDamage(int amount)
{
    if (!isAlive) return;

    health = Mathf.Max(health - amount, 0);
    healthBar.SetValue(health);

    if (health == 0) Die();
}
```

### Sen yaz

Verilen 40 satırlık `Update` üç metoda bölünür: `ReadInput`, `MovePlayer`,
`CheckBounds`. Kontrol, `Update`'in kaç satır kaldığını ve metotların
çağrıldığını sınar.

### Kontrol

| # | Tip | Soru | Doğru | Yanlış şıkkın hedefi |
| --- | --- | --- | --- | --- |
| 1 | `refactor` | Üç yerde tekrar eden bloğu metoda çıkar | — | Kopyala-yapıştır alışkanlığı |
| 2 | `fill-blank` | `private ____ IsAlive() { return health > 0; }` | `bool` | Dönüş tipini `void` bırakmak |
| 3 | `predict` | Metot içinde tanımlanan `int temp` dışarıdan okunabilir mi? | Hayır | Kapsamı bilmemek |
| 4 | `spot-bug` | `void` metodun sonunda `return health;` | Dönüş tipi uyuşmuyor | `void` ile değer döndürmeyi karıştırmak |
| 5 | `live-code` | `TakeDamage(int amount)` yaz, can sıfırın altına düşmesin | `Mathf.Max` | Negatif cana izin vermek |

### Özet

- Metot adı fiil olur ve ne yaptığını söyler.
- `void` içinde `return;` erken çıkıştır.
- Aynı kodu ikinci kez yazıyorsan, bir metoda çıkarma vaktidir.

---

## Grup sonu

Ders 08 bitince öğrenci şunu yapabilir: bir script yazar, `GameObject`'e ekler,
Inspector'dan ayarlar, koşul ve döngü kurar, tekrar eden kodu metoda çıkarır.

Henüz yapamadığı: nesneyi hareket ettirmek. O, Modül 2'nin işi ve bir sonraki
grupta geliyor.

### Bu grubun ürettiği tekrar kavramları

`engine-vs-game`, `edit-vs-play-mode`, `editor-windows`, `hierarchy-vs-project`,
`console-basics`, `external-editor`, `intellisense`, `breakpoint`,
`class-basics`, `using-directive`, `unity-calls-you`, `value-types`,
`int-division`, `float-suffix`, `access-modifiers`, `serialization`,
`inspector-overrides-code`, `conditionals`, `loops`, `infinite-loop-danger`,
`methods`, `parameters`, `scope`, `refactor-extract`

24 kavram. İlk tekrar oturumu Ders 05 sonrasında açılır ve Ders 01-03'ün
kavramlarından 8 soru sorar.

### Bu grup için yazılacak bileşenler

İçerikten önce bunlar hazır olmalı, yoksa içerik iki kez elden geçer.

| Bileşen | Kullanıldığı ders |
| --- | --- |
| Ders oynatıcı (adım adım akış) | Hepsi |
| `predict` alıştırması | Hepsi |
| `match` alıştırması | 01, 02, 03, 05, 06 |
| `scenario` alıştırması | 01, 02, 03 |
| `spot-bug` alıştırması | 02, 04, 07, 08 |
| `fill-blank` alıştırması | 04, 05, 08 |
| `order-lines` alıştırması | 07 |
| `inspector` simülasyonu | 05, 06 |
| `live-code` editörü ve kontrol motoru | 04, 05, 06, 07, 08 |
| `refactor` alıştırması | 08 |
| Yan not (`aside`) kutusu | 05 |
| Ders altı yorumlar | Hepsi |
