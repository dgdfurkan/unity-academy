import type { Lesson } from "@/content/types";

/**
 * Ders 01 — Unity Nedir, Ne Değildir?
 *
 * Bu ders kavramla açılıyor ve tek satır kod içermiyor. Amacı, öğrencinin
 * kafasındaki "Unity oyun yapar" cümlesini "Unity çizer ve hesaplar, oyunu
 * ben yazarım" cümlesiyle değiştirmek. Anlatım yerine iki canlı simülasyon
 * kullanıyor: biri sistemleri tek tek kapattırıyor, diğeri Play Mode'un
 * neden geçici olduğunu denetiyor.
 */
export const m1l1: Lesson = {
  id: "m1-l1",
  moduleIndex: 0,
  lessonIndex: 0,
  minutes: 15,
  concepts: ["engine-vs-game", "edit-vs-play-mode"],
  steps: [
    {
      kind: "hook",
      title: {
        tr: "Küpü düşüren kod nerede?",
        en: "Where is the code that made the cube fall?",
      },
      body: {
        tr: "Sahneye bir küp koydun ve üzerine bir Rigidbody bileşeni ekledin. Play'e bastığında küp aşağı düştü, zemine çarptı ve durdu. Bu davranışı tarif eden tek bir satır kod yazmadın. Yerçekimini, çarpışmayı ve durmayı motor kendisi hesapladı.\n\nPeki motor bu kadarını kendiliğinden yapıyorsa, geriye sana ne kalıyor? Bu dersin cevaplamaya çalıştığı soru bu. Cevabı bulduğunda, karşılaştığın her problemde \"bunu motor mu halleder, ben mi yazmalıyım\" sorusunu doğru cevaplayabileceksin.",
        en: "You dropped a cube into the scene and added a Rigidbody component to it. When you pressed Play the cube fell, hit the floor and stopped. You did not write a single line describing that behaviour. Gravity, the collision and the stop were all calculated by the engine.\n\nSo if the engine does that much on its own, what is left for you? That is the question this lesson answers. Once you have the answer, you will be able to look at any problem and know whether the engine handles it or you have to write it.",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: true,
        question: {
          tr: "Bir nişancı oyunu düşün. Aşağıdakilerden hangilerini Unity, sen kod yazmadan yapar?",
          en: "Think about a shooter. Which of these does Unity do without you writing any code?",
        },
        choices: [
          {
            text: {
              tr: "Merminin duvara çarptığını tespit etmek",
              en: "Detecting that the bullet hit a wall",
            },
            correct: true,
            feedback: {
              tr: "Doğru. Çarpışma tespiti fizik motorunun işidir. İki collider kesiştiğinde motor bunu fark eder ve sana haber verir. Senin işin, haber geldiğinde ne olacağına karar vermek.",
              en: "Correct. Detecting collisions is the physics engine's job. When two colliders overlap the engine notices and tells you. Your job is to decide what happens once it does.",
            },
          },
          {
            text: {
              tr: "Duvarın gölgesini ekrana çizmek",
              en: "Drawing the wall's shadow on screen",
            },
            correct: true,
            feedback: {
              tr: "Doğru. Işık hesabı, gölge, perspektif ve ekrana çizim tamamen motorun işidir. Sen yalnızca ışığın nerede duracağını söylersin.",
              en: "Correct. Lighting, shadows, perspective and drawing to the screen all belong to the engine. You only say where the light stands.",
            },
          },
          {
            text: {
              tr: "Mermi çarpınca düşmanın canının 25 azalmasına karar vermek",
              en: "Deciding that a hit costs the enemy 25 health",
            },
            correct: false,
            feedback: {
              tr: "Bu bir oyun kuralıdır ve senin yazman gerekir. Motor sana yalnızca çarpışmanın olduğunu söyler. Canın ne kadar azalacağı, hiç azalıp azalmayacağı, zırhın devreye girip girmeyeceği tamamen senin kararın.",
              en: "That is a game rule and you have to write it. The engine only tells you a collision happened. How much health is lost, whether it is lost at all, whether armour reduces it: those are all your decisions.",
            },
          },
          {
            text: {
              tr: "Düşman öldüğünde bir sonraki dalganın başlaması",
              en: "Starting the next wave when the enemy dies",
            },
            correct: false,
            feedback: {
              tr: "Bu da senin işin. Motorun oyununda dalga olduğundan haberi bile yok. Dalga kavramını, sırasını ve zorluğunu sen tanımlarsın.",
              en: "Also yours. The engine has no idea your game even has waves. You define what a wave is, when it comes and how hard it gets.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: {
        tr: "Motor ne yapar, sen ne yaparsın",
        en: "What the engine does and what you do",
      },
      blocks: [
        {
          kind: "text",
          text: {
            tr: "Oyun motoru, her oyunda tekrar eden işleri üstlenen bir yazılımdır. Bir üçgeni ekrana çizmek, iki cismin çarpışıp çarpışmadığını hesaplamak, dokunmayı okumak, sesi hoparlöre göndermek: bunların hepsi her oyunda aynı şekilde yapılır. Unity bu işleri bir kez yazmış ve sana hazır veriyor.",
            en: "A game engine is software that takes on the work every game repeats. Drawing a triangle to the screen, working out whether two bodies overlap, reading a touch, sending sound to the speaker: all of these work the same way in every game. Unity wrote them once and hands them to you.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Senin yazdığın şey ise oyunun kendisidir. Oyunun kuralları, hedefleri, dengesi ve karakteri motorda bulunmaz, çünkü bunlar senin oyununa özeldir. Bir platform oyunuyla bir bulmaca oyunu aynı motoru kullanır ama tamamen farklı kurallarla çalışır.",
            en: "What you write is the game itself. Its rules, its goals, its balance and its character are not in the engine, because they belong to your game alone. A platformer and a puzzle game use the same engine and run on completely different rules.",
          },
        },
        {
          kind: "table",
          head: [
            { tr: "Durum", en: "Situation" },
            { tr: "Motorun yaptığı", en: "What the engine does" },
            { tr: "Senin yazdığın", en: "What you write" },
          ],
          rows: [
            [
              { tr: "Karakter zıplıyor", en: "The character jumps" },
              {
                tr: "Yukarı doğru kuvveti uygular, yerçekimini ekler, zemine çarpmayı bulur",
                en: "Applies the upward force, adds gravity, finds the landing",
              },
              {
                tr: "Zıplamanın ne kadar yüksek olacağı, havada ikinci zıplama olup olmadığı",
                en: "How high the jump is and whether a second jump is allowed in the air",
              },
            ],
            [
              { tr: "Jeton toplanıyor", en: "A coin is collected" },
              {
                tr: "Karakterin jetona değdiğini haber verir",
                en: "Reports that the character touched the coin",
              },
              {
                tr: "Jetonun kaç puan ettiği, sayacın nasıl artacağı, sesin çalıp çalmayacağı",
                en: "What the coin is worth, how the counter goes up, whether a sound plays",
              },
            ],
            [
              { tr: "Düşman görünüyor", en: "An enemy appears" },
              {
                tr: "Modeli çizer, gölgesini hesaplar, kameraya göre konumlandırır",
                en: "Draws the model, computes its shadow, positions it for the camera",
              },
              {
                tr: "Düşmanın nereden çıkacağı, kaç tane olacağı, ne yapacağı",
                en: "Where it comes from, how many there are and what it does",
              },
            ],
          ],
        },
        {
          kind: "sim",
          variant: "engine-split",
          caption: {
            tr: "Dört sistemi tek tek kapatıp neyin bozulduğuna bak. Üçü motorun, biri senin.",
            en: "Switch each of the four systems off and see what breaks. Three belong to the engine, one to you.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Yukarıdaki sahnede kapattığın sistemlerden üçü motora aitti: render, fizik ve girdi. Kapattığında sahne çizilmedi, karakter düşmedi, dokunma okunmadı. Dördüncüsü senindi: oyun kuralları kapandığında görüntüde hiçbir şey bozulmadı, sadece jeton sayacı artmayı bıraktı. Kural yoksa oyun da yoktur, ama motor bundan hiç rahatsız olmaz.",
            en: "Three of the systems you switched off belong to the engine: rendering, physics and input. With them off the scene was not drawn, the character did not fall and touches were not read. The fourth was yours: with the game rules off nothing looked broken, the coin counter simply stopped going up. Without rules there is no game, but the engine does not mind at all.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Unity'nin ne olmadığını da söylemek gerekir. Unity bir çizim programı değildir: karakter modelini Blender'da, dokusunu Photoshop'ta, sesini bir ses programında üretip buraya getirirsin. Unity hazır bir oyun şablonu da değildir: içinde başlamaya hazır bir platform oyunu yoktur. Ve düğmeye basınca oyun üreten bir araç hiç değildir.",
            en: "It is worth saying what Unity is not. It is not a drawing program: you model the character in Blender, paint the texture in Photoshop, make the sound in an audio tool and bring all of it in. It is not a ready-made game template either: there is no platformer sitting inside waiting for you. And it is certainly not a tool that produces a game at the press of a button.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Editörde iki mod vardır ve bu ayrım ilk günden itibaren önem taşır. Edit Mode'da sahneyi kurarsın: nesneleri yerleştirir, değerleri ayarlar, script eklersin. Play Mode'da oyunu denersin: kodun çalışır, fizik işler, girdi okunur.",
            en: "The editor has two modes and the distinction matters from day one. In Edit Mode you build the scene: you place objects, set values and attach scripts. In Play Mode you try the game: your code runs, physics ticks and input is read.",
          },
        },
        {
          kind: "sim",
          variant: "play-mode",
          caption: {
            tr: "Play'e bas, çalışırken speed değerini değiştir, sonra Stop'a bas.",
            en: "Press Play, change speed while it runs, then press Stop.",
          },
        },
        {
          kind: "callout",
          tone: "warning",
          text: {
            tr: "Az önce gördüğün şey yeni başlayanın en çok saat kaybettiği yerdir. Play sırasında bir değeri güzelce ayarlarsın, oyun tam istediğin gibi olur, Stop'a basarsın ve bütün ayarların kaybolur. Unity bunu sana sormaz, uyarmaz; sessizce sahnede kayıtlı olan değerlere döner. Kalıcı bir değişiklik yapacaksan önce Play'den çık.",
            en: "What you just saw is where beginners lose the most hours. You tune a value during Play, the game finally feels right, you press Stop and every adjustment is gone. Unity does not ask and does not warn; it quietly returns to the values stored in the scene. If a change is meant to last, leave Play first.",
          },
        },
      ],
    },
    {
      kind: "check",
      exercises: [
        {
          kind: "sim",
          variant: "play-mode",
          question: {
            tr: "Play Mode'da bir değeri değiştirip Stop'a bas. Değerin ne olduğunu kendi gözünle gör.",
            en: "Change a value in Play Mode and press Stop. See for yourself what happens to it.",
          },
          feedback: {
            tr: "Play sırasındaki değişiklik geçicidir. Kalıcı olması için Edit Mode'da yapılması gerekir. Bir gün \"ama ben bunu ayarlamıştım\" dediğinde ilk bakacağın yer burasıdır.",
            en: "A change made during Play is temporary. To make it stick it has to happen in Edit Mode. The day you catch yourself saying \"but I set that\", this is the first thing to check.",
          },
        },
        {
          kind: "match",
          question: {
            tr: "Bir yarış oyunundaki her işi doğru tarafla eşleştir",
            en: "Match each job in a racing game to the side that handles it",
          },
          pairs: [
            {
              left: { tr: "Arabanın duvara çarpması", en: "The car hitting the wall" },
              right: { tr: "Motor", en: "Engine" },
            },
            {
              left: { tr: "Çarpınca kaç saniye ceza alınacağı", en: "How many seconds the crash costs" },
              right: { tr: "Sen", en: "You" },
            },
            {
              left: { tr: "Lastik izinin asfalta çizilmesi", en: "Drawing the tyre marks on the asphalt" },
              right: { tr: "Motor", en: "Engine" },
            },
            {
              left: { tr: "Üçüncü turda yağmurun başlaması", en: "Rain starting on the third lap" },
              right: { tr: "Sen", en: "You" },
            },
          ],
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Bir arkadaşın diyor ki: \"Unity kullanınca oyun kendiliğinden oluyor, kod yazmaya gerek yok.\" Ona ne cevap verirsin?",
            en: "A friend says: \"With Unity the game just happens, you do not need to write code.\" What do you tell them?",
          },
          choices: [
            {
              text: {
                tr: "Motor çizim ve fiziği hallediyor ama oyunun kurallarını yazan biri olmalı",
                en: "The engine handles drawing and physics, but someone has to write the game's rules",
              },
              correct: true,
              feedback: {
                tr: "Doğru. Motor altyapıyı verir, oyunu sen yazarsın. Kod yazmadan bir sahne kurabilirsin ama o sahne bir oyun olmaz.",
                en: "Right. The engine gives you the foundation; you write the game. You can build a scene without code, but that scene will not be a game.",
              },
            },
            {
              text: {
                tr: "Haklı, Unity her şeyi kendisi yapıyor",
                en: "They are right, Unity does everything itself",
              },
              correct: false,
              feedback: {
                tr: "Az önce sahnede gördün: oyun kurallarını kapattığında görüntü bozulmadı ama jeton sayacı durdu. O kuralı yazacak biri olmadan oyun oyun olmuyor.",
                en: "You just saw it in the scene: with the game rules off nothing looked broken, but the coin counter stopped. Without someone writing that rule there is no game.",
              },
            },
            {
              text: {
                tr: "Yanılıyor, Unity fizik hesabını da senin yazmanı bekliyor",
                en: "They are wrong, Unity expects you to write the physics too",
              },
              correct: false,
              feedback: {
                tr: "Fizik motorun işidir. Rigidbody eklediğin küp senden hiçbir kod almadan düştü.",
                en: "Physics is the engine's job. The cube you gave a Rigidbody fell without a single line from you.",
              },
            },
          ],
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Karakterin zıplama yüksekliğini kalıcı olarak değiştirmek istiyorsun. Hangi sırayla çalışırsın?",
            en: "You want to permanently change the character's jump height. In what order do you work?",
          },
          choices: [
            {
              text: {
                tr: "Play'de deneyerek doğru değeri bulurum, Stop'a basarım, sonra Edit Mode'da o değeri yazarım",
                en: "Find the right value by trying it in Play, press Stop, then set that value in Edit Mode",
              },
              correct: true,
              feedback: {
                tr: "Doğru ve profesyoneller de böyle çalışır. Play Mode denemek için idealdir çünkü sonucu anında görürsün; ama bulduğun değeri Edit Mode'da yazmadan iş bitmez.",
                en: "Right, and this is how professionals work. Play Mode is ideal for trying things because you see the result immediately, but the job is not done until you write the value down in Edit Mode.",
              },
            },
            {
              text: {
                tr: "Play sırasında değiştirip Ctrl+S ile kaydederim",
                en: "Change it during Play and press Ctrl+S",
              },
              correct: false,
              feedback: {
                tr: "Unity Play sırasında sahneyi kaydetmez, bu isteği reddeder. Değeri kaybetmenin en hızlı yolu budur.",
                en: "Unity refuses to save the scene during Play. This is the fastest way to lose the value.",
              },
            },
            {
              text: {
                tr: "Hiç Play'e basmadan doğrudan Edit Mode'da yazarım",
                en: "Skip Play entirely and just write it in Edit Mode",
              },
              correct: false,
              feedback: {
                tr: "Çalışır ama doğru değeri bulmak zorlaşır. Zıplama hissi ancak oynayarak ayarlanır; Play Mode tam da bunun için var.",
                en: "It works, but finding the right value gets harder. Jump feel can only be tuned by playing, and that is exactly what Play Mode is for.",
              },
            },
          ],
        },
      ],
    },
    {
      kind: "summary",
      points: [
        {
          tr: "Motor çizer, hesaplar ve paketler. Oyunun kurallarını sen yazarsın.",
          en: "The engine draws, calculates and packages. You write the game's rules.",
        },
        {
          tr: "Unity bir araçtır. Model, ses ve tasarım başka yerden gelir.",
          en: "Unity is a tool. Models, sound and design come from elsewhere.",
        },
        {
          tr: "Play Mode denemek içindir. Kalıcı her değişiklik Edit Mode'da yapılır.",
          en: "Play Mode is for trying things. Every lasting change is made in Edit Mode.",
        },
      ],
    },
  ],
};
