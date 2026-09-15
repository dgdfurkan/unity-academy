import type { Lesson } from "@/content/types";

/**
 * Ders 01 — Unity Nedir, Ne Değildir?
 *
 * Hedef kitle: Unity'yi hiç açmamış, oyun motoru kavramını bilmeyen kişi.
 * Bu yüzden ders hiçbir Unity terimiyle başlamıyor. Rigidbody, Prefab,
 * Inspector gibi isimler burada geçmez; sıraları sonraki derslerde.
 *
 * Biçim: her metin adımı en fazla üç dört cümle ve hemen ardından bir etkinlik
 * geliyor. Uzun paragraf yok, arka arkaya iki metin adımı yok.
 */
export const m1l1: Lesson = {
  id: "m1-l1",
  moduleIndex: 0,
  lessonIndex: 0,
  minutes: 15,
  concepts: ["engine-vs-game", "edit-vs-play-mode"],
  steps: [
    /* ---------- 1. Oyun motoru nedir ---------- */
    {
      kind: "read",
      title: { tr: "Bir oyun neyden oluşur?", en: "What is a game made of?" },
      text: {
        tr: "Bir oyunu açtığında ekranda görüntü var, ses var, dokununca bir şeyler oluyor. Bunların hepsini yazan birileri var. Ama şunu fark et: bu işlerin çoğu her oyunda aynı.",
        en: "When you open a game there are pictures, there is sound, and things react to your touch. Somebody wrote all of it. But notice this: most of that work is the same in every game.",
      },
    },
    {
      kind: "activity",
      activity: {
        kind: "reveal",
        question: {
          tr: "Her oyunda tekrar eden dört iş. Dokun ve ne olduklarını gör.",
          en: "Four jobs that repeat in every game. Tap each one to see what it means.",
        },
        cards: [
          {
            front: { tr: "Ekrana çizmek", en: "Drawing to the screen" },
            back: {
              tr: "Karakter, zemin, gökyüzü, gölgeler. Hepsi her karede yeniden ekrana çizilir. Saniyede altmış kez.",
              en: "The character, the ground, the sky, the shadows. All of it is drawn to the screen again every frame. Sixty times a second.",
            },
          },
          {
            front: { tr: "Düşürmek ve çarpıştırmak", en: "Falling and colliding" },
            back: {
              tr: "Bir şey havadaysa düşer, zemine değince durur. İki şey çarpışırsa bir şeyler olur. Buna fizik denir.",
              en: "Something in the air falls and stops when it hits the ground. Two things touch and something happens. This is called physics.",
            },
          },
          {
            front: { tr: "Dokunmayı okumak", en: "Reading your touch" },
            back: {
              tr: "Parmağın ekranın neresine değdi, ne kadar kaydırdın, hangi tuşa bastın. Oyunun bunu bilmesi gerekir.",
              en: "Where your finger touched, how far you dragged, which key you pressed. The game needs to know all of it.",
            },
          },
          {
            front: { tr: "Ses çalmak", en: "Playing sound" },
            back: {
              tr: "Müzik, adım sesi, patlama. Doğru sesi doğru anda hoparlöre göndermek gerekir.",
              en: "Music, footsteps, an explosion. The right sound has to reach the speaker at the right moment.",
            },
          },
        ],
      },
    },
    {
      kind: "read",
      title: { tr: "İşte motor bu", en: "That is what an engine is" },
      text: {
        tr: "Bu dört işi her oyun için sıfırdan yazmak yıllar alır. Oyun motoru, bu işleri bir kez yazıp herkese hazır veren programdır. Unity de bir oyun motorudur.",
        en: "Writing those four jobs from scratch for every game would take years. A game engine is a program that wrote them once and hands them to everyone. Unity is one of those engines.",
      },
    },
    {
      kind: "task",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "Buna göre oyun motoru ne yapan bir programdır?",
          en: "So what does a game engine actually do?",
        },
        choices: [
          {
            text: {
              tr: "Her oyunda tekrar eden işleri hazır olarak verir",
              en: "It gives you the work that repeats in every game, ready-made",
            },
            correct: true,
            feedback: {
              tr: "Doğru. Çizim, fizik, girdi ve ses motorun içinde hazır durur. Sen bunları yeniden yazmazsın.",
              en: "Right. Drawing, physics, input and sound already sit inside the engine. You do not write them again.",
            },
          },
          {
            text: { tr: "Senin yerine oyunu tasarlar", en: "It designs the game for you" },
            correct: false,
            feedback: {
              tr: "Tasarlamaz. Motor nasıl çizileceğini bilir ama ne çizileceğine sen karar verirsin.",
              en: "It does not. The engine knows how to draw; what to draw is your decision.",
            },
          },
          {
            text: { tr: "Oyunun grafiklerini çizer", en: "It draws the game's artwork" },
            correct: false,
            feedback: {
              tr: "Motor hazır görselleri ekrana çizer, ama görselleri üreten sensin ya da bir tasarımcı.",
              en: "The engine puts finished art on the screen, but the art itself comes from you or a designer.",
            },
          },
        ],
      },
    },

    /* ---------- 2. Peki sen ne yaparsın ---------- */
    {
      kind: "read",
      title: { tr: "Peki geriye ne kaldı?", en: "So what is left?" },
      text: {
        tr: "Motor bu kadarını yapıyorsa, sana ne kalıyor? Oyunun kendisi. Yani kurallar. Kaç can var, jeton kaç puan eder, düşman ne zaman gelir, oyun ne zaman biter.",
        en: "If the engine does all that, what is left for you? The game itself. The rules. How much health there is, what a coin is worth, when the enemy shows up, when the game ends.",
      },
    },
    {
      kind: "activity",
      activity: {
        kind: "sort",
        question: {
          tr: "Bir platform oyunu düşün. Her işi doğru kutuya koy.",
          en: "Think of a platform game. Put each job in the right box.",
        },
        buckets: [
          { id: "engine", label: { tr: "Motor yapar", en: "The engine does it" } },
          { id: "you", label: { tr: "Sen yazarsın", en: "You write it" } },
        ],
        items: [
          {
            text: { tr: "Karakterin düşmesi", en: "The character falling" },
            bucket: "engine",
            why: {
              tr: "Düşme fizik işidir. Motor yerçekimini kendisi uygular.",
              en: "Falling is physics. The engine applies gravity by itself.",
            },
          },
          {
            text: { tr: "Zıplamanın ne kadar yüksek olacağı", en: "How high the jump goes" },
            bucket: "you",
            why: {
              tr: "Bu bir tasarım kararı. Motor zıplatır ama yüksekliği sen belirlersin.",
              en: "That is a design decision. The engine can make it jump, but you decide how high.",
            },
          },
          {
            text: { tr: "Gölgelerin çizilmesi", en: "Drawing the shadows" },
            bucket: "engine",
            why: {
              tr: "Işık ve gölge hesabı tamamen motorun işidir.",
              en: "Light and shadow calculations belong entirely to the engine.",
            },
          },
          {
            text: { tr: "Jetonun kaç puan ettiği", en: "What a coin is worth" },
            bucket: "you",
            why: {
              tr: "Motorun oyununda jeton olduğundan haberi yok. Puanı sen tanımlarsın.",
              en: "The engine has no idea your game has coins. You define what they are worth.",
            },
          },
          {
            text: { tr: "Parmağın ekrana değdiğini anlamak", en: "Knowing your finger touched the screen" },
            bucket: "engine",
            why: {
              tr: "Girdi okuma motorun işi. Sen yalnızca o dokunuşun ne yapacağını yazarsın.",
              en: "Reading input is the engine's job. You only write what that touch does.",
            },
          },
          {
            text: { tr: "Üç can bitince oyunun bitmesi", en: "The game ending after three lives" },
            bucket: "you",
            why: {
              tr: "Can sayısı ve bitiş koşulu senin kuralın. Üç yerine beş de yapabilirdin.",
              en: "The number of lives and the losing condition are your rules. You could have made it five.",
            },
          },
        ],
      },
    },

    /* ---------- 3. Canlı sahne ---------- */
    {
      kind: "read",
      title: { tr: "Şimdi bunu çalışırken gör", en: "Now watch it happen" },
      text: {
        tr: "Aşağıda çalışan bir sahne var. Dört sistemi tek tek kapatabilirsin. Üçü motorun işi, biri senin. Hangisini kapatınca ne bozuluyor, kendin gör.",
        en: "Below is a running scene. You can switch four systems off one at a time. Three belong to the engine, one to you. See for yourself what breaks with each.",
      },
    },
    {
      kind: "task",
      exercise: {
        kind: "sim",
        variant: "engine-split",
        question: {
          tr: "Dört sistemi de bir kez kapat. Her birinde neyin bozulduğuna dikkat et.",
          en: "Switch all four systems off once. Pay attention to what breaks each time.",
        },
        feedback: {
          tr: "Render, fizik ve girdi kapanınca sahne gözle görülür şekilde bozuldu. Oyun kuralları kapandığında görüntüde hiçbir şey değişmedi, sadece sayaç durdu. Motor bundan rahatsız olmaz ama oyun oyun olmaktan çıkar.",
          en: "With rendering, physics or input off the scene visibly broke. With the game rules off nothing looked different, the counter simply stopped. The engine does not mind, but the game stops being a game.",
        },
      },
    },

    /* ---------- 4. Unity ne değildir ---------- */
    {
      kind: "read",
      title: { tr: "Unity'nin yapmadığı şeyler", en: "What Unity does not do" },
      text: {
        tr: "Yeni başlayanların çoğu Unity'den yapamayacağı şeyler bekler. Üç yaygın yanılgı var.",
        en: "Most beginners expect things from Unity that it does not do. There are three common misunderstandings.",
      },
    },
    {
      kind: "activity",
      activity: {
        kind: "reveal",
        question: {
          tr: "Üç yanılgı. Dokun ve doğrusunu oku.",
          en: "Three misunderstandings. Tap to read what is actually true.",
        },
        cards: [
          {
            front: { tr: "Unity çizim programıdır", en: "Unity is a drawing program" },
            back: {
              tr: "Değildir. Karakter modelini Blender gibi bir programda yaparsın, resimleri Photoshop'ta çizersin, sesi başka bir programda hazırlarsın. Unity bunları alıp bir araya getirir.",
              en: "It is not. You model the character in something like Blender, draw the images in Photoshop and make the sound elsewhere. Unity takes those and brings them together.",
            },
          },
          {
            front: { tr: "İçinde hazır oyun vardır", en: "It comes with a ready game" },
            back: {
              tr: "Yoktur. Unity'yi açtığında bomboş bir alan görürsün. Hazır bir platform oyunu ya da nişancı oyunu içinde bulunmaz.",
              en: "It does not. Open Unity and you get an empty space. There is no ready-made platformer or shooter sitting inside.",
            },
          },
          {
            front: { tr: "Düğmeye basınca oyun çıkar", en: "A button press produces a game" },
            back: {
              tr: "Çıkmaz. Oyunun kurallarını yazmadan ortada oyun olmaz. Bu kursun tamamı zaten o kuralları yazmayı öğretiyor.",
              en: "It does not. Without rules there is no game. Writing those rules is what this whole course is about.",
            },
          },
        ],
      },
    },

    /* ---------- 5. İki mod ---------- */
    {
      kind: "read",
      title: { tr: "Kurma modu ve deneme modu", en: "Build mode and try mode" },
      text: {
        tr: "Unity'de iki mod var. Birinde sahneyi kurarsın: nesneleri yerleştirir, ayarları yaparsın. Diğerinde oyunu denersin: her şey çalışır, oynayabilirsin. Bunlara Edit Mode ve Play Mode denir.",
        en: "Unity has two modes. In one you build the scene: you place objects and set values. In the other you try the game: everything runs and you can play. They are called Edit Mode and Play Mode.",
      },
    },
    {
      kind: "read",
      title: { tr: "Aralarındaki tehlikeli fark", en: "The dangerous difference" },
      text: {
        tr: "Play Mode'da bir ayarı değiştirirsen, oyunu durdurduğun anda o değişiklik silinir. Unity bunu sormaz ve uyarmaz. Aşağıda kendin dene.",
        en: "If you change a setting in Play Mode, it is erased the moment you stop the game. Unity does not ask and does not warn. Try it yourself below.",
      },
    },
    {
      kind: "task",
      exercise: {
        kind: "sim",
        variant: "play-mode",
        question: {
          tr: "Play'e bas. Çalışırken hızı değiştir. Sonra Stop'a bas ve değere bak.",
          en: "Press Play. Change the speed while it runs. Then press Stop and look at the value.",
        },
        feedback: {
          tr: "Değer eski hâline döndü. Bu, yeni başlayanın en çok saat kaybettiği yerdir: bir ayarı Play sırasında güzelce bulursun, Stop'a basarsın, hepsi gider. Kalıcı olacak her değişikliği Play'den çıktıktan sonra yap.",
          en: "The value snapped back. This is where beginners lose the most hours: you finally get a setting right during Play, press Stop, and it is all gone. Make every lasting change after you leave Play.",
        },
      },
    },
    {
      kind: "task",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "Karakterin zıplama yüksekliğini kalıcı değiştireceksin. Hangi sırayla çalışırsın?",
          en: "You want to permanently change the jump height. In what order do you work?",
        },
        choices: [
          {
            text: {
              tr: "Play'de deneyip doğru değeri bulurum, Stop'a basarım, sonra o değeri yazarım",
              en: "Try values in Play, press Stop, then write the value down",
            },
            correct: true,
            feedback: {
              tr: "Doğru. Profesyoneller de böyle çalışır. Play denemek için idealdir çünkü sonucu anında görürsün, ama bulduğun değeri Stop'tan sonra yazmadan iş bitmez.",
              en: "Right, and this is how professionals work. Play is ideal for trying because you see the result at once, but the job is not done until you write the value down after Stop.",
            },
          },
          {
            text: { tr: "Play sırasında değiştirip kaydederim", en: "Change it during Play and save" },
            correct: false,
            feedback: {
              tr: "Unity Play sırasında sahneyi kaydetmez. Az önce simülasyonda gördüğün şey tam olarak bu.",
              en: "Unity does not save the scene during Play. That is exactly what you just saw in the simulation.",
            },
          },
          {
            text: { tr: "Hiç denemeden doğrudan değeri yazarım", en: "Skip trying and just set the value" },
            correct: false,
            feedback: {
              tr: "Çalışır ama doğru değeri bulmak zorlaşır. Zıplama hissi ancak oynayarak ayarlanır.",
              en: "It works, but finding the right value gets much harder. Jump feel can only be tuned by playing.",
            },
          },
        ],
      },
    },

    /* ---------- Özet ---------- */
    {
      kind: "summary",
      points: [
        {
          tr: "Oyun motoru, her oyunda tekrar eden işleri hazır veren programdır.",
          en: "A game engine is a program that hands you the work every game repeats.",
        },
        {
          tr: "Motor çizer, düşürür, dokunmayı okur. Kuralları sen yazarsın.",
          en: "The engine draws, drops things and reads your touch. You write the rules.",
        },
        {
          tr: "Play Mode denemek içindir. Kalıcı değişiklik Edit Mode'da yapılır.",
          en: "Play Mode is for trying. Lasting changes happen in Edit Mode.",
        },
      ],
    },
  ],
};
