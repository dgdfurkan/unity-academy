# Proje Brief

Unity ve C# öğreten interaktif bir eğitim platformu. Tek öğrenciyle yürüyecek 25 saatlik
birebir kurs için tasarlanıyor, ama içerik ve altyapı sonradan başka öğrencilere açılabilecek
şekilde kurgulanıyor.

## 1. Taraflar

**Eğitmen (admin):** Furkan Gündüz. Bilgi Üniversitesi Dijital Oyun Tasarımı mezunu,
2019'dan beri Unity Game Developer. Superprof üzerinden ders veriyor.

**Öğrenci:** Superprof üzerinden gelen yeni öğrenci. Daha önce AI yardımıyla bir şeyler
üretmiş, artık işin kendisini öğrenmek istiyor. Hızlı kavrıyor, temel konularda uzun
tekrara ihtiyacı yok.

**Öğrencinin hedefi:** Mobil oyun üretebilmek. Basit oyunlar, idle ve endless runner
türleri, reklam oyunu (playable ad / hyper-casual) mantığında prodüksiyonlar.

## 2. Kapsam

- Toplam süre: 20-25 saat birebir ders.
- Ders günleri esnek. Takvimden çok müfredat akışı önemli.
- Platform üzerinden ders işlenecek, ödev verilecek, ilerleme takip edilecek.
- Kurs içeriğinin ders ders detayı bu fazın dışında. Önce platform ayağa kalkacak.

## 3. Ürün tanımı

Tarayıcıda çalışan, ders anlatımı ile pratiği aynı yerde birleştiren bir öğrenme platformu.
Duolingo'nun alışkanlık ve tekrar mekaniğini, Unity Learn ve Code Monkey tarzı içeriğin
teknik derinliğiyle birleştiriyor.

### Roller

| Rol | Yetki |
| --- | --- |
| Admin (eğitmen) | Öğrenci profili açar, müfredatı yönetir, ödev atar, ilerlemeyi ve puanı görür |
| Öğrenci | Dersleri işler, alıştırma ve ödevleri yapar, kendi ilerlemesini görür |

### Çekirdek özellikler

**Ders akışı.** Her ders; anlatım, uygulamalı örnek, alıştırma ve ölçme adımlarından oluşur.
Adımlar tamamlanmadan bir sonrakine geçilmez.

**Kod simülasyonu.** Site içinde gömülü kod editörü. Öğrenci C# yazar, "kontrol et" der,
sonucu anında görür. Editör deneyimi Rider ve Visual Studio alışkanlıklarına yakın durur:
söz dizimi renklendirme, otomatik tamamlama, hata altı çizgisi.

**Alıştırma tipleri.** Tek tip soru yok. Eşleştirme, boşluk doldurma, kod sıralama,
hata bulma, çoktan seçmeli, serbest kod yazma. Konuya hangisi uyuyorsa o kullanılır.

**Puanlama.** Her ders ve her alıştırma puan üretir. Puan; doğruluk, deneme sayısı ve
süreye göre hesaplanır. Öğrenci kendi ilerlemesini, eğitmen sınıfın tamamını görür.

**Aralıklı tekrar.** 5. derse gelindiğinde 1. dersin kritik kavramları tekrar karşısına
çıkar. Duolingo mantığı: unutma eğrisine göre konuyu geri getir, kısa tut, geçtiyse
aralığı uzat.

**Ödev.** Ders sonrası verilir, site içinde yapılır ve teslim edilir. Eğitmen görür,
not verir, yorum bırakır.

**3B interaktif anlatım.** Transform, vektör, rotasyon, collider, rigidbody, raycast gibi
uzamsal konular metinle anlatılmaz. Tarayıcıda döndürülebilen, kaydırılabilen canlı
sahneyle anlatılır. Fizik konularında öğrenci değeri değiştirir, sonucu anında görür.

**Maskot.** Platformun karakteri. Ders başında karşılar, hata yapınca yönlendirir,
seri bozulunca geri çağırır. Duolingo'daki baykuşun işlevi, ama kendi tasarımımızla.

## 4. Müfredat çerçevesi

Detay içerik sonraki fazda yazılacak. Program bu eksenler üzerine kuruluyor:

1. **C# temeli.** Değişken tipleri (`int`, `float`, `bool`, `string`), erişim belirleyiciler
   (`private`, `public`, `protected`), `[SerializeField]`, koşul, döngü, metot, sınıf.
   Her kavram Unity'de karşılığı gösterilerek anlatılır, havada bırakılmaz.
2. **Unity yaşam döngüsü.** `Awake`, `OnEnable`, `Start`, `Update`, `FixedUpdate`,
   `LateUpdate` farkları ve hangisinin ne zaman kullanılacağı.
3. **Sahne ve bileşen mimarisi.** GameObject, Component, Prefab, Transform hiyerarşisi.
4. **Fizik.** Rigidbody, Collider, trigger, raycast, layer mask.
5. **Girdi ve kontrol.** Dokunmatik girdi, mobil kontrol şemaları.
6. **Oyun türü prodüksiyonları.** Endless runner ve idle oyun mekanikleri uçtan uca.
7. **Performans.** `Update` içinde ne yazılmaz, object pooling, garbage allocation,
   draw call, mobil profil alma.
8. **Mimari.** SOLID, nesne yönelimli tasarım, ScriptableObject, event ve observer
   yapıları, bağımlılık yönetimi.
9. **Üçüncü parti araçlar.** DOTween ve benzeri paketlerin projeye eklenmesi, ne işe
   yaradığı, ne zaman tercih edileceği.
10. **Yayın.** Build ayarları, mobil derleme, reklam ve analytics entegrasyonunun mantığı.

## 5. Teknik yapı

### Yerleşim

- **Frontend:** GitHub Pages üzerinde statik olarak yayınlanır.
- **Backend ve veri:** Eğitmenin kendi VPS sunucusu. API, veritabanı ve oturum yönetimi
  burada durur.

GitHub Pages yalnızca statik dosya sunar. Bu yüzden frontend statik export edilebilir
şekilde kurulur, dinamik her şey VPS'teki API üzerinden gider. CORS ve kimlik doğrulama
buna göre planlanır. VPS detayları eğitmenden gelecek.

### Önerilen stack (onay bekliyor)

| Katman | Seçim | Gerekçe |
| --- | --- | --- |
| Frontend | Next.js statik export + TypeScript | GitHub Pages ile uyumlu, tip güvenliği |
| Stil | Tailwind CSS + tasarım token'ları | Tutarlı sistem, hızlı responsive |
| Bileşen | shadcn/ui (Radix tabanlı) | Erişilebilirlik hazır gelir |
| Animasyon | Framer Motion + GSAP | Sayfa geçişi ve mikro etkileşim |
| 3B | Three.js / react-three-fiber | Tarayıcıda canlı Unity kavram anlatımı |
| Kod editörü | Monaco Editor | Rider ve VS'e en yakın tarayıcı deneyimi |
| Backend | VPS üzerinde API + veritabanı | Veri eğitmenin kontrolünde |

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

**Dil.** Arayüz İngilizcesi kusursuz olur. Yarım yamalak çeviri, gramer hatası, tuhaf
kelime seçimi kabul edilmez.

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
| 1 | Bilgi mimarisi, veri modeli, ekran akışları | Sırada |
| 2 | Tasarım sistemi, token'lar, maskot | |
| 3 | Frontend iskelet, rota ve düzen | |
| 4 | VPS API, kimlik doğrulama, admin ve öğrenci profilleri | |
| 5 | Ders motoru, alıştırma tipleri, kod editörü | |
| 6 | Puanlama ve aralıklı tekrar | |
| 7 | 3B interaktif modüller | |
| 8 | Ders içeriğinin yazımı | |
| 9 | Test, erişilebilirlik ve performans geçişi, yayın | |

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
| `senior-backend` | API tasarımı, kimlik doğrulama, veritabanı |
| `senior-architect` | Sistem mimarisi, teknik karar kayıtları |
| `code-reviewer` | SOLID ihlali ve kod kokusu denetimi, C# dahil |
| `senior-qa` | Birim, entegrasyon ve E2E test üretimi |
| `senior-devops` | CI/CD, dağıtım, altyapı |
| `docker-development` | VPS üzerinde container düzeni |
| `ci-cd-pipeline-builder` | GitHub Pages ve VPS dağıtım hattı |
| `database-schema-designer` | Öğrenci, ders, ilerleme ve puan şeması |
| `performance-profiler` | Darboğaz tespiti, bundle ve sorgu ölçümü |
| `env-secrets-manager` | Sır yönetimi, VPS kimlik bilgileri |
| `a11y-audit` | WCAG 2.2 AA denetimi |
| `full-page-screenshot` | Responsive görsel kontrol |

**Ürün ve metin**

| Skill | Ne için |
| --- | --- |
| `ui-design-system` | Token üretimi, responsive hesaplar, tasarım-geliştirme aktarımı |
| `ux-researcher-designer` | Öğrenci yolculuğu haritası, kullanılabilirlik testi |
| `content-humanizer` | Metinlerden AI tonunu temizlemek |
| `copy-editing` | Arayüz İngilizcesinin son kontrolü |
