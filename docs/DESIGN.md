# Tasarım Sistemi

Bu dosya arayüzün kaynak doğrusu. Bir değer burada yazmıyorsa bileşenin içine yazılmaz,
önce buraya eklenir.

## 1. Yön

Ürün, oyun motoru öğreten bir araç. Öğrenci gününün geri kalanını Unity Editor, Rider ve
Visual Studio içinde geçiriyor. Arayüz o dünyanın diliyle konuşur: koyu zemin, net tipografi,
ölçülü hareket, gürültüsüz yüzeyler.

Duolingo'dan alınan şey mekanik: küçük parçalara bölünmüş ders, anında geri bildirim, seri,
aralıklı tekrar, puan. Estetiği alınmıyor. Bu bir çocuk uygulaması değil.

**Kalite çıtası:** Linear, Raycast, Vercel. Her ekran bu seviyede durmalı.

**Yasak liste.** Jenerik SaaS şablonu görüntüsü. Stok illüstrasyon. İkon yerine emoji.
Mor-pembe gradyan zemin. Amaçsız glassmorphism. Sekiz farklı gölge. Sebepsiz yuvarlatılmış
kocaman kartlar. Sayfa boyunca zıplayan öğeler.

## 2. Renk

Koyu tema varsayılan. Açık tema tam destekli, sonradan eklenen bir şey değil.

Renk her zaman token üzerinden gelir. Bileşene ham hex yazılmaz.

### Koyu tema yüzeyleri

| Token | Değer | Kullanım |
| --- | --- | --- |
| `--bg` | `#0A0D14` | Sayfa zemini |
| `--surface` | `#111621` | Kart, panel |
| `--surface-2` | `#171D2B` | Yükseltilmiş yüzey, popover, kod editörü |
| `--surface-3` | `#1E2637` | Hover zemini, seçili satır |
| `--border` | `#242C3E` | Yüzey ayıracı |
| `--border-strong` | `#3A4459` | Girdi alanı, odaklanabilir sınır |

Saf siyah kullanılmıyor. OLED ekranda kaydırma sırasında iz bırakıyor ve beyaz metinle
kontrast fazla sert kalıyor.

### Metin

| Token | Değer | Kontrast (bg üzerinde) |
| --- | --- | --- |
| `--text` | `#E8ECF5` | 16.0:1 |
| `--text-muted` | `#98A2B8` | 7.4:1 |
| `--text-subtle` | `#7C8698` | 5.2:1 |

### Anlamsal renkler

Her rengin tek bir işi var. İki renk aynı anlamı taşımaz.

| Token | Değer | Anlam |
| --- | --- | --- |
| `--accent` | `#6E4CFF` | Marka, birincil eylem, aktif durum |
| `--accent-text` | `#A594FF` | Koyu zemin üzerinde mor metin ve ikon |
| `--success` | `#34D399` | Kod çalıştı, cevap doğru |
| `--warning` | `#FBBF24` | Seri, XP, dikkat |
| `--danger` | `#FB7185` | Hata, derleme hatası, yanlış cevap |
| `--info` | `#38BDF8` | Kavram ipucu, bilgi notu |

Dolu yüzey ile metin için ayrı token kullanılır. `--accent` dolu buton zemini içindir,
üstünde beyaz metin 5.1:1 verir. Koyu zemin üzerinde mor yazı gerektiğinde `--accent-text`
kullanılır, 7.5:1 verir. Aynı moru her iki yerde kullanmak kontrastı düşürür.

### Doğrulama

Kontrast oranları `scripts/check-contrast.mjs` ile ölçülüyor. Palete dokunan her değişiklik
bu betiği geçmek zorunda.

## 3. Tipografi

| Rol | Font | Neden |
| --- | --- | --- |
| Arayüz | Inter Variable | Nötr, yoğun arayüzde okunur, değişken ağırlık |
| Kod | JetBrains Mono | Rider'ın varsayılan fontu, öğrenci zaten tanıyor |

Fontlar `next/font` ile derleme anında kendi sunucumuzdan servis ediliyor. Google Fonts'a
çalışma anında istek gitmiyor: render engelleyen üçüncü parti bağlantı yok, düzen kayması yok.

### Ölçek

| Token | Boyut / satır yüksekliği | Harf aralığı | Kullanım |
| --- | --- | --- | --- |
| `xs` | 12 / 16 | 0 | Etiket, rozet |
| `sm` | 14 / 20 | 0 | İkincil metin, form yardımı |
| `base` | 16 / 26 | 0 | Gövde |
| `lg` | 18 / 28 | 0 | Ders paragrafı |
| `xl` | 20 / 28 | -0.01em | Kart başlığı |
| `2xl` | 24 / 32 | -0.015em | Bölüm başlığı |
| `3xl` | 30 / 38 | -0.02em | Sayfa başlığı |
| `4xl` | 38 / 44 | -0.025em | Ekran başlığı |
| `5xl` | 48 / 54 | -0.03em | Hero |

Gövde metni 16px'in altına inmez. Uzun metin satırı 68 karakteri geçmez.

## 4. Boşluk ve biçim

Taban birim 4px. Kullanılan basamaklar: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
Ara değer uydurulmaz.

Dikey ritim üç kademe: bileşen içi 8-16, bileşenler arası 24-32, bölümler arası 48-80.

| Radius | Değer | Kullanım |
| --- | --- | --- |
| `sm` | 6px | Rozet, küçük girdi |
| `md` | 10px | Buton, girdi |
| `lg` | 14px | Kart |
| `xl` | 20px | Sayfa paneli, modal |
| `full` | 9999px | Avatar, pill |

Gölge dört kademeyle sınırlı: `sm` (hover ipucu), `md` (kart yükselmesi), `lg` (popover),
`xl` (modal). Koyu temada gölge yerine yüzey tonu farkı ve ince kenarlık daha iyi çalışıyor,
gölge ölçülü kullanılıyor.

## 5. Hareket

Kullanıcının isteği net: bol ve şık, ama dikkat dağıtmayan. Bunun kuralı şu.

**Hareketin bir işi olur.** Durum değişimini göstermek, dikkati yönlendirmek veya geri
bildirim vermek. Süslemek için animasyon eklenmez. Ekranda kendi kendine dönen, nefes alan,
parlayan hiçbir şey yok.

### Süreler

| Token | Süre | Nerede |
| --- | --- | --- |
| `--dur-instant` | 120ms | Hover, basma |
| `--dur-fast` | 180ms | Anahtar, sekme, rozet |
| `--dur-base` | 260ms | Kart girişi, açılır menü |
| `--dur-slow` | 420ms | Sayfa geçişi, panel |
| `--dur-deliberate` | 640ms | Yalnızca kutlama anı |

### Yumuşatma

| Token | Eğri | Nerede |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Giriş, açılma |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Çıkış, kapanma |
| `--ease-soft` | `cubic-bezier(0.32, 0.72, 0, 1)` | Düzen kayması, panel |

Çıkış girişten hızlıdır. Kapanan bir şeyi izlemek istemeyiz.

### Kurallar

- Yalnızca `transform` ve `opacity` animasyonlanır. `width`, `height`, `top`, `left`,
  `margin` asla. Bunlar düzen hesabını tetikler ve mobilde kare düşürür.
- Bir öğede aynı anda en fazla iki özellik hareket eder.
- Sıralı giriş 60ms aralıkla, en fazla 8 öğede. Sonrası tek seferde görünür.
- Kaydırmayla tetiklenen giriş bir kez çalışır, geri kaydırınca tekrarlamaz.
- Mobilde parallax yok.
- Döngüsel animasyon yalnızca üç yerde: yükleniyor göstergesi, seri alevi, maskot bekleme
  hali. Maskot ekrandan çıkınca durur.
- `prefers-reduced-motion: reduce` açıkken zorunlu olmayan hareket kapanır ve son durum
  anında çizilir. Geçiş süreleri 0'a iner, opaklık geçişi kalır.

### Kütüphane

Ana kütüphane Motion. `LazyMotion` ile yalnızca kullanılan özellikler paketleniyor,
çekirdek yaklaşık 5KB kalıyor.

GSAP varsayılan olarak projede yok. Yalnızca kaydırmaya bağlı karmaşık bir sahne gerekirse,
yalnızca o rotada, dinamik import ile yüklenir.

## 6. Kırılım noktaları ve yerleşim

| Ad | Genişlik | Hedef |
| --- | --- | --- |
| `base` | 0+ | Telefon, 375px referans |
| `sm` | 480px | Büyük telefon |
| `md` | 768px | Tablet dikey |
| `lg` | 1024px | Tablet yatay, küçük dizüstü |
| `xl` | 1280px | Masaüstü |
| `2xl` | 1536px | Geniş ekran |

### Kabuk

**Telefon (< 768px).** Duolingo düzeni. Altta gezinti çubuğu, en fazla 5 sekme. Üstte ince
başlık: seri, XP ve kalp yerine ilerleme. İçerik dikey akar. Birincil eylem alt sabit
çubukta, başparmak menzilinde.

**Tablet (768-1023px).** Solda ikonlu dar gezinti rayı. İçerik iki sütuna açılabilir.
Ders ekranında sağda bağlam paneli.

**Masaüstü (1024px+).** Solda kalıcı kenar çubuğu, etiketli. İçerik ortalanır ve azami
genişlikle sınırlanır. Ders ekranında üç bölge: gezinti, içerik, kod paneli.

### Güvenli alan

`viewport-fit=cover` kullanılıyor, çentik ve ana ekran çubuğu için `env(safe-area-inset-*)`
uygulanıyor.

- Sabit üst başlık `padding-top` olarak `env(safe-area-inset-top)` ekler.
- Alt gezinti çubuğu `padding-bottom` olarak `env(safe-area-inset-bottom)` ekler.
- Kaydırılan içerik alt çubuğun arkasında kalmaz, `scroll-padding-bottom` verilir.
- Yatay çentik için `env(safe-area-inset-left/right)` kenar boşluklarına eklenir.

Her sabit öğe bu kurala uyar. Tek bir istisna kabul edilmiyor.

### Dokunma

Dokunma hedefi en az 44x44px. Hedefler arası en az 8px. Yalnızca hover ile erişilen
işlev yok.

## 7. PWA

- `display: standalone`, kendi başlık çubuğu yok, tam ekran uygulama gibi açılır.
- Maskelenebilir ikon seti, Android'in daire kırpmasında logo kesilmez.
- `theme-color` koyu ve açık tema için ayrı tanımlı, iOS durum çubuğu zemine karışır.
- Service worker uygulama kabuğunu ve tamamlanmış ders verisini önbelleğe alır. Bağlantı
  koptuğunda öğrenci mevcut dersi bitirebilir, ilerleme geri gelince eşitlenir.
- Kurulum önerisi sayfa açılır açılmaz gösterilmez. Öğrenci ilk dersini bitirdikten sonra,
  bir kez, reddedilebilir biçimde çıkar.

## 8. Erişilebilirlik

- WCAG 2.2 AA.
- Odak halkası her zaman görünür. `outline: none` tek başına yazılmaz, yerine görünür bir
  halka konur.
- Klavyeyle her ekran baştan sona gezilebilir. Kod editörü tuzağa düşürmez, Esc ile çıkılır.
- İkon-yalnız butonun `aria-label`'ı olur.
- Anlam yalnızca renkle taşınmaz. Doğru ve yanlış durumu ikon ve metinle de belirtilir.
- Canlı bölgeler: puan değişimi ve doğrulama sonucu ekran okuyucuya duyurulur.

## 9. Teslim öncesi kontrol

- [ ] 375, 768, 1024, 1440 genişliklerinde düzen bozulmuyor
- [ ] Yatay kaydırma yok
- [ ] Çentikli cihazda sabit öğeler güvenli alana saygılı
- [ ] Dokunma hedefleri 44px ve üzeri
- [ ] Kontrast betiği geçiyor
- [ ] Klavyeyle tam gezinti, odak görünür
- [ ] `prefers-reduced-motion` açıkken hareket duruyor
- [ ] Animasyonda yalnızca transform ve opacity
- [ ] İkonlar tek aileden, emoji yok
- [ ] Metinlerde AI tonu yok, İngilizce kusursuz
