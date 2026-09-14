# Proje Brief

Unity ve C# öğreten interaktif bir kurs platformu. Birden çok öğrenciye açık, iki dilli
(Türkçe varsayılan, İngilizce seçenek), web ve mobilde uygulama gibi çalışan bir ürün.

## 1. Ürün

Öğrenci kayıt olur, modülleri kendi hızında ilerletir, ilerlemesi ve puanı tutulur.
Tek kişiye özel bir ders sayfası değil.

**Eğitmen.** Furkan Gündüz. Bilgi Üniversitesi Dijital Oyun Tasarımı mezunu, 2019'dan beri
Unity Game Developer. Müfredatı yazar, ödevleri görür, öğrencileri takip eder.

**Hedef kitle.** Unity ile mobil oyun yapmak isteyenler. Üç tipik profil:

- Kod yazmayı bilen ama Unity'ye yeni geçen geliştirici.
- AI yardımıyla bir şeyler üretmiş, artık işin kendisini öğrenmek isteyen kişi.
- Oyun geliştirmeye sıfırdan başlayan, C# temeli olmayan kişi.

**Çıktı.** Öğrenci kursun sonunda basit mobil oyunlar üretebilir: idle, endless runner ve
reklam oyunu (playable ad) mantığındaki yapımlar.

## 2. Kapsam

- Sekiz modül, her modül kendi içinde derslere bölünür.
- İçerik hacmi yaklaşık 25 saatlik ders karşılığı. Kimse bu süreye bağlı değil, herkes
  kendi hızında ilerler.
- Ders içeriğinin madde madde yazımı sonraki fazda. Önce platform ayağa kalkar.
- Birebir ders, platformun üstüne eklenebilecek ayrı bir katman. Ürünün kendisi kurs.

## 3. Ürün tanımı

Tarayıcıda çalışan, anlatım ile pratiği aynı yerde birleştiren bir öğrenme platformu.
Duolingo'nun alışkanlık ve tekrar mekaniğini, Unity Learn ve Code Monkey tarzı içeriğin
teknik derinliğiyle birleştiriyor. Mekanik alınıyor, estetik alınmıyor: hedef kitle
yetişkin ve profesyonel bir beceri öğreniyor.

### Roller

| Rol | Yetki |
| --- | --- |
| Eğitmen (admin) | Müfredatı yönetir, öğrencileri ve ilerlemeyi görür, ödev atar ve değerlendirir |
| Öğrenci | Kayıt olur, modülleri ilerletir, alıştırma ve ödev yapar, kendi ilerlemesini görür |

### Çekirdek özellikler

**Ders akışı.** Her ders; anlatım, uygulamalı örnek, alıştırma ve ölçme adımlarından oluşur.
Adımlar tamamlanmadan bir sonrakine geçilmez.

**Kod simülasyonu.** Site içinde gömülü kod editörü. Öğrenci C# yazar, kontrol eder,
sonucu anında görür. Editör deneyimi Rider ve Visual Studio alışkanlıklarına yakın durur:
söz dizimi renklendirme, otomatik tamamlama, hata altı çizgisi.

**Alıştırma tipleri.** Tek tip soru yok. Eşleştirme, boşluk doldurma, kod sıralama,
hata bulma, çoktan seçmeli, serbest kod yazma. Konuya hangisi uyuyorsa o kullanılır.

**Puanlama.** Her ders ve her alıştırma puan üretir. Puan; doğruluk, deneme sayısı ve
süreye göre hesaplanır. Öğrenci kendi ilerlemesini, eğitmen tüm öğrencileri görür.

**Aralıklı tekrar.** Beşinci modüle gelindiğinde birinci modülün kritik kavramları tekrar
karşısına çıkar. Duolingo mantığı: unutma eğrisine göre konuyu geri getir, kısa tut,
geçtiyse aralığı uzat.

**Ödev.** Ders sonrası verilir, site içinde yapılır ve teslim edilir. Eğitmen görür,
not verir, yorum bırakır.

**3B interaktif anlatım.** Transform, vektör, rotasyon, Collider, Rigidbody, Raycast gibi
uzamsal konular metinle anlatılmaz. Tarayıcıda döndürülebilen, kaydırılabilen canlı
sahneyle anlatılır. Fizik konularında öğrenci değeri değiştirir, sonucu anında görür.

**Maskot.** Platformun karakteri. Ders başında karşılar, hata yapınca yönlendirir,
seri bozulunca geri çağırır. Duolingo'daki baykuşun işlevi, kendi tasarımımızla.

## 4. Müfredat çerçevesi

Detay içerik sonraki fazda yazılacak. Program bu eksenler üzerine kuruluyor. Unity ve C#
tarafındaki isimler hiçbir dilde çevrilmez.

1. **C# temeli.** `int`, `float`, `bool`, `string`, erişim belirleyiciler, `[SerializeField]`,
   koşul, döngü, metot, sınıf. Her kavram Unity'de karşılığı gösterilerek anlatılır.
2. **Yaşam döngüsü.** `Awake`, `OnEnable`, `Start`, `Update`, `FixedUpdate`, `LateUpdate`
   farkları ve hangisinin ne zaman kullanılacağı.
3. **Sahne ve bileşen mimarisi.** `GameObject`, `Component`, `Prefab`, `Transform` hiyerarşisi.
4. **Fizik.** `Rigidbody`, `Collider`, trigger, `Raycast`, layer mask.
5. **Girdi ve kontrol.** Dokunmatik girdi, mobil kontrol şemaları.
6. **Oyun türü prodüksiyonları.** Endless runner ve idle oyun mekanikleri uçtan uca.
7. **Performans.** `Update` içinde ne yazılmaz, object pooling, allocation, draw call,
   mobil profil alma.
8. **Mimari.** SOLID, nesne yönelimli tasarım, `ScriptableObject`, event ve observer
   yapıları, bağımlılık yönetimi.
9. **Üçüncü parti araçlar.** DOTween ve benzeri paketlerin projeye eklenmesi, ne işe
   yaradığı, ne zaman tercih edileceği.
10. **Yayın.** Build ayarları, mobil derleme, reklam ve analytics entegrasyonunun mantığı.

## 5. Teknik yapı

### Yerleşim

- **Frontend:** Next.js, statik export. GitHub Pages üzerinde yayınlanır.
- **Veri, kimlik doğrulama ve dosya:** Firebase.

GitHub Pages yalnızca statik dosya sunar. Sunucu tarafı render, API route veya çalışma
anında Node gerektiren hiçbir şey frontend'e girmez. Dinamik olan her şey tarayıcıdan
Firebase SDK ile konuşur. Bu ikisi birlikte kendi sunucusunu yönetme yükünü tamamen
kaldırıyor.

### Firebase servisleri

| Servis | Ne için |
| --- | --- |
| Authentication | Eğitmen ve öğrenci girişi, rol ayrımı |
| Firestore | Öğrenci, ders, ilerleme, puan, ödev ve tekrar takvimi |
| Storage | Ödev teslimi, ders içi görsel ve medya |
| Security Rules | Öğrenci yalnızca kendi verisini görür, yazma yetkisi rolle sınırlanır |

Erişim kontrolü tamamen Security Rules ile kurulur. Arayüzde bir kontrolü gizlemek
güvenlik değildir, kural yazılmadan hiçbir koleksiyon açılmaz.

### Stack

| Katman | Seçim | Gerekçe |
| --- | --- | --- |
| Frontend | Next.js 16, statik export, TypeScript | GitHub Pages ile uyumlu, tip güvenliği |
| Stil | Tailwind CSS 4, CSS değişkeni token'ları | Tema anında döner, tutarlı sistem |
| Animasyon | Motion, `LazyMotion` ile | Çekirdek yaklaşık 5KB kalıyor |
| İkon | Lucide | Tek aile, SVG, emoji yok |
| 3B | Three.js / react-three-fiber | Tarayıcıda canlı kavram anlatımı |
| Kod editörü | Monaco Editor | Rider ve Visual Studio'ya en yakın deneyim |
| Veri | Firebase | Sunucu yönetimi yok, gerçek zamanlı ilerleme |

Monaco ve 3B sahneler dinamik import ile yüklenir. Ana sayfa paketine girmezler.

### PWA

Telefonda ana ekrana eklenip uygulama gibi açılır. Standalone görünüm, maskelenebilir
ikon seti, tema rengi, çentik için güvenli alan. Service worker uygulama kabuğunu
önbelleğe alır, bağlantı koptuğunda açık ders bitirilebilir.

### Tasarım sistemi

Renk, tipografi, boşluk, hareket ve kırılım noktası kararları `docs/DESIGN.md` dosyasında.
Kontrast oranları `scripts/check-contrast.mjs`, responsive davranış
`scripts/ui-audit.mjs` ile ölçülüyor. İkisi de tahmin değil, ölçüm.

## 6. Kalite kuralları

Bunlar tercih değil, kabul kriteri.

**Kod.** SOLID ve nesne yönelimli tasarıma uyulur. Tek sorumluluk bozulmaz, bağımlılıklar
arayüz üzerinden gider. Bu kural hem platformun kendi kodu hem de derslerde öğretilen
Unity kodu için geçerlidir. Derste "böyle yapmayın" denen şey platformun kodunda
bulunamaz.

**Performans.** Gereksiz render yok, ağır işlem ana thread'i kilitlemez, 3B sahneler
görünmedikleri sürece çalışmaz, medya tembel yüklenir. Mobilde de akıcı çalışır.

**Animasyon.** Bol ve şık, ama amaçlı. Her animasyonun bir işlevi olur: durum değişimini
göstermek, dikkat yönlendirmek, geri bildirim vermek. Süslemek için animasyon eklenmez.
`prefers-reduced-motion` desteklenir.

**Responsive.** Web, tablet ve mobil. Üçünde de kusursuz. Mobil arayüz Duolingo'ya yakın
durur: alt navigasyon, tek elle kullanım, büyük dokunma alanları, dikey akış.

**Dil.** Site iki dilli: Türkçe varsayılan ve kökte, İngilizce `/en` altında. Her iki dil
de kusursuz olur. Türkçede çeviri kokusu, İngilizcede gramer hatası kabul edilmez.

**Terim.** Unity ve C# tarafındaki hiçbir isim çevrilmez. `Update`, `FixedUpdate`,
`Rigidbody`, `Collider`, `Raycast`, `Prefab`, `SerializeField` Türkçe metinde de aynen
kalır. Çevrilen şey bunların etrafındaki cümledir. Yaygın Türkçesi olmayan bir terim
uydurulmaz, İngilizcesi bırakılır.

**Ton.** Hiçbir yerde AI yazısı gibi durmaz. Klişe kalıp yok, gereksiz emoji yok,
şişirilmiş cümle yok. Metinler kısa, net ve insan ağzından.

**Erişilebilirlik.** WCAG 2.2 AA. Klavye ile tam gezinilebilir, kontrast oranları tutar,
ekran okuyucuyla anlamlı.

**Depo hijyeni.** Gereksiz dosya tutulmaz. README projenin ne olduğunu kısaca anlatır,
kurulum ansiklopedisi olmaz. Commit mesajları ne değiştiğini söyler.

## 7. Yol haritası

| Faz | İçerik | Durum |
| --- | --- | --- |
| 0 | Skill kurulumu, brief, depo | Tamam |
| 1 | Tasarım sistemi, token'lar, proje iskeleti, ilk ekran | Tamam |
| 2 | Firebase şeması, kimlik doğrulama, roller | Sırada |
| 3 | Maskot ve uygulama kabuğu | |
| 4 | Öğrenci paneli ve eğitmen paneli | |
| 5 | Ders motoru ve alıştırma tipleri | |
| 6 | Kod editörü ve kontrol motoru | |
| 7 | Puanlama ve aralıklı tekrar | |
| 8 | 3B interaktif modüller | |
| 9 | Ders içeriğinin yazımı | |
| 10 | Test, erişilebilirlik ve performans geçişi, yayın | |

## 8. Kurulu skill envanteri

`.claude/skills/` altında, iki kaynaktan seçilerek alındı.

**Tasarım** (kaynak: nextlevelbuilder/ui-ux-pro-max-skill)

| Skill | Ne için |
| --- | --- |
| `ui-ux-pro-max` | Stil, palet, tipografi, UX kuralları, GSAP hareket setleri, stack kılavuzları |
| `ui-styling` | shadcn/ui, Tailwind, dark mode, erişilebilir bileşen kalıpları |
| `design-system` | Üç katmanlı token mimarisi, bileşen spesifikasyonu |
| `design` | Logo ve ikon üretimi, maskot ve görsel kimlik |

**Mühendislik** (kaynak: alirezarezvani/claude-skills)

| Skill | Ne için |
| --- | --- |
| `senior-frontend` | React, Next.js, TypeScript, Tailwind |
| `senior-backend` | Firestore şeması, kimlik doğrulama, Security Rules |
| `senior-architect` | Sistem mimarisi, teknik karar kayıtları |
| `code-reviewer` | SOLID ihlali ve kod kokusu denetimi, C# dahil |
| `senior-qa` | Birim, entegrasyon ve E2E test üretimi |
| `senior-devops` | CI/CD, dağıtım, altyapı |
| `ci-cd-pipeline-builder` | GitHub Pages dağıtım hattı |
| `database-schema-designer` | Öğrenci, ders, ilerleme ve puan koleksiyonları |
| `performance-profiler` | Darboğaz tespiti, bundle ve sorgu ölçümü |
| `env-secrets-manager` | Firebase anahtarları ve ortam değişkeni hijyeni |
| `a11y-audit` | WCAG 2.2 AA denetimi |
| `full-page-screenshot` | Responsive görsel kontrol |

**Ürün ve metin**

| Skill | Ne için |
| --- | --- |
| `ui-design-system` | Token üretimi, responsive hesaplar, tasarım-geliştirme aktarımı |
| `ux-researcher-designer` | Öğrenci yolculuğu haritası, kullanılabilirlik testi |
| `content-humanizer` | Metinlerden AI tonunu temizlemek |
| `copy-editing` | Arayüz İngilizcesinin son kontrolü |
