# CLAUDE.md

Unity ve C# öğreten interaktif eğitim platformu. Kapsam, roller, müfredat çerçevesi ve
yol haritası için `docs/BRIEF.md` dosyasına bak. Bu dosya çalışma kurallarını tutar.

## Mimari kısıtlar

- Frontend GitHub Pages üzerinde **statik** yayınlanır. Sunucu tarafı render, API route
  veya çalışma anında Node gerektiren hiçbir şey frontend'e girmez.
- Dinamik her şey eğitmenin VPS sunucusundaki API üzerinden gider. Veri orada durur.
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

## Metin

- Arayüz dili İngilizce ve kusursuz olur. Gramer hatası, tuhaf kelime seçimi, çeviri
  kokusu kabul edilmez.
- Hiçbir metin AI yazısı gibi durmaz. Klişe kalıp yok, gereksiz emoji yok, şişirme yok.
- Öğrenciye giden her cümle kısa, net ve insan ağzından.

## Depo

- Gereksiz dosya tutulmaz. Üretilen çıktı, geçici dosya ve kurulum artığı commit edilmez.
- README projenin ne olduğunu kısaca anlatır. Kurulum ansiklopedisi, özellik listesi
  şişirmesi veya rozet yığını yazılmaz.
- Commit mesajı ne değiştiğini söyler. AI imzası, emoji başlığı, şablon metin yok.
- Sırlar depoya girmez. VPS kimlik bilgileri ortam değişkeninde durur.

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
