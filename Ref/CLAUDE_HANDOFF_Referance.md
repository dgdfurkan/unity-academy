# Unity Academy — açık tema etkileşimli ders

Bu paket, “Editör Turu: Altı Pencere” dersi için hazırlanmış bağımsız ve çalışır bir arayüz prototipidir.

## Paketin içeriği

- `index.html`: Tasarım, responsive stiller, animasyonlar ve bütün etkileşimler tek dosyadadır.
- Harici kütüphane, font, görsel veya ağ isteği yoktur.
- Dosya doğrudan tarayıcıda açılabilir.

## Tasarım yönü

Arayüz, mevcut Unity Academy kimliğiyle uyumludur:

- Açık lavanta sayfa zemini
- Beyaz kartlar ve ince lavanta sınırlar
- Ana aksiyonlarda canlı mor
- Turuncu, yeşil ve sarı geri bildirim vurguları
- Koyu erik rengi metin
- Başlıklarda editoryal serif, arayüz metinlerinde sistem sans-serif
- Basıldığında aşağı çöken, fiziksel hissi olan butonlar

Duolingo benzeri yön, görsel kopyalama yerine öğrenme davranışlarında kullanılmıştır: tek görev odağı, aşamalı kilit açma, büyük dokunma hedefleri, anlık doğru/yanlış geri bildirimi, XP/seri, sabit mobil aksiyon alanı ve kutlama animasyonları.

## Çalışan etkinlikler

1. Panel Avı: Unity'nin altı penceresini dokunarak keşfetme.
2. Bağlantı Laboratuvarı: Prefab canını değiştirme, tek örnek silme ve ana kalıbı silme sonuçlarını karşılaştırma.
3. Kabloları Bağla: Görevleri doğru Unity pencerelerine animasyonlu kablolarla eşleştirme.
4. Hata Dedektifi: Console mesajındaki dosya ve satır numarasından doğru kod satırını bulma.
5. Ustalık Kontrolü: Senaryolu iki soru ve açıklamalı geri bildirim.

## Etkileşim ve hareket

- Doğru bağlantılarda akan renkli kablolar
- Yanlış cevaplarda sarsılma ve desteklenen mobil cihazlarda titreşim
- Dokunma dalgası
- Kart, simge ve nesnelerde hafif bekleme animasyonları
- Aşama geçişlerinde yönlü giriş
- Hareketli ilerleme dolgusu
- XP, seri, başarı ekranı ve konfeti
- `prefers-reduced-motion` desteği

## Responsive davranış

- Masaüstü: Sol aşama rayı ve geniş laboratuvar çalışma alanı.
- Tablet: Sol ray açılır menüye dönüşür, iki sütunlu deneyler gerektiğinde tek sütuna iner.
- Mobil (620px ve altı): Tek görev akışı, kompakt başlık, büyük dokunma hedefleri ve ekranın altında sabit ilerleme butonları.

## Mevcut projeye aktarım notu

Prototip vanilla HTML/CSS/JS'tir. Next.js/React projesine aktarırken her `.activity` bölümü ayrı bir bileşene ayrılabilir. Üst seviye `state` nesnesi reducer veya Zustand store'a taşınabilir. CSS değişkenleri global tema tokenlarına dönüştürülebilir. DOM kimlikleri ve `data-*` alanları mevcut davranışların bağlantı noktalarıdır; bileşenleştirme sırasında anlamları korunmalıdır.

Türkçe metinler UTF-8 olarak saklanmalıdır.
