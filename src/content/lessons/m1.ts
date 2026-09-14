import type { Lesson } from "@/content/types";

/** Ders 01 — Unity Nedir, Ne Değildir? */
export const m1l1: Lesson = {
  id: "m1-l1",
  moduleIndex: 0,
  lessonIndex: 0,
  minutes: 12,
  concepts: ["engine-vs-game", "edit-vs-play-mode"],
  steps: [
    {
      kind: "hook",
      title: {
        tr: "Bu küpün düşmesini kimse koda yazmadı",
        en: "Nobody wrote code to make this cube fall",
      },
      body: {
        tr: "Sahneye bir küp koyuyorsun, Play'e basıyorsun, küp düşüyor ve zemine çarpıp duruyor. Tek satır kod yazmadın. Motor bunu kendiliğinden yaptıysa, geriye sana ne kalıyor?",
        en: "You drop a cube into the scene, hit Play, and it falls and lands on the floor. You wrote no code at all. If the engine does that on its own, what is left for you to do?",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: true,
        question: {
          tr: "Aşağıdakilerden hangilerini Unity sen kod yazmadan yapar?",
          en: "Which of these does Unity do without you writing any code?",
        },
        choices: [
          {
            text: { tr: "İki nesnenin çarpıştığını hesaplamak", en: "Working out that two objects collided" },
            correct: true,
            feedback: {
              tr: "Doğru. Çarpışma tespiti motorun fizik tarafının işi. Sen yalnızca çarpışınca ne olacağını yazarsın.",
              en: "Right. Collision detection is the engine's physics job. You only write what happens on impact.",
            },
          },
          {
            text: { tr: "Sahneyi ekrana çizmek", en: "Drawing the scene on screen" },
            correct: true,
            feedback: {
              tr: "Doğru. Render motorun işi. Neyin görüneceğine sen karar verirsin, nasıl çizileceğine motor.",
              en: "Right. Rendering is the engine's job. You decide what is visible; the engine decides how it is drawn.",
            },
          },
          {
            text: { tr: "Çarpışınca canın azalmasına karar vermek", en: "Deciding that a collision costs health" },
            correct: false,
            feedback: {
              tr: "Bu bir oyun kuralı. Motor çarpışmayı bildirir, sonucunda ne olacağını sen yazarsın.",
              en: "That is a game rule. The engine reports the collision; what it costs is up to your code.",
            },
          },
          {
            text: { tr: "Hangi seviyenin ne zaman açılacağını belirlemek", en: "Deciding when the next level unlocks" },
            correct: false,
            feedback: {
              tr: "Bu da bir oyun kuralı. Motorun sahneleri yükleme aracı var ama hangisini ne zaman yükleyeceğini sen söylersin.",
              en: "Also a game rule. The engine can load scenes, but you say which one and when.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "Motor ne yapar, sen ne yaparsın", en: "What the engine does, what you do" },
      blocks: [
        {
          kind: "text",
          text: {
            tr: "Oyun motoru, her oyunda tekrar eden işleri üstlenen bir yazılım. Onlarca yıldır herkesin yeniden yazdığı şeyleri bir kez yazıp sana veriyor.",
            en: "A game engine is software that takes over the work every game repeats. It writes once what everyone used to rewrite, and hands it to you.",
          },
        },
        {
          kind: "table",
          head: [
            { tr: "Motorun işi", en: "The engine's job" },
            { tr: "Senin işin", en: "Your job" },
          ],
          rows: [
            [
              { tr: "Sahneyi ekrana çizmek", en: "Drawing the scene" },
              { tr: "Sahnede ne olacağına karar vermek", en: "Deciding what goes in the scene" },
            ],
            [
              { tr: "Fizik: düşme, çarpışma, sürtünme", en: "Physics: falling, collisions, friction" },
              { tr: "Çarpışınca ne olacağı", en: "What a collision costs" },
            ],
            [
              { tr: "Girdi okumak: dokunma, tuş, jiroskop", en: "Reading input: touch, keys, gyroscope" },
              { tr: "Girdinin neyi tetikleyeceği", en: "What that input triggers" },
            ],
            [
              { tr: "Ses çalmak", en: "Playing sound" },
              { tr: "Hangi sesin ne zaman çalacağı", en: "Which sound plays when" },
            ],
            [
              { tr: "Android ve iOS'a paketlemek", en: "Packaging for Android and iOS" },
              { tr: "Neyin paketleneceği", en: "What goes into the package" },
            ],
          ],
        },
        {
          kind: "text",
          text: {
            tr: "Kısaca: motor nasılını bilir, sen neyini yazarsın.",
            en: "In short: the engine knows the how, you write the what.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Unity ne değildir? Bir çizim programı değil, hazır bir oyun şablonu değil, düğmeye basınca oyun üreten bir araç hiç değil. Model, ses ve görselleri başka araçlarda üretip buraya getirirsin.",
            en: "What Unity is not: a drawing program, a ready-made game template, or a tool that produces a game at the press of a button. You make models, sounds and art elsewhere and bring them in.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Editörde iki mod var. Edit Mode'da sahneyi kurarsın; Play Mode'da oyunu denersin.",
            en: "The editor has two modes. In Edit Mode you build the scene; in Play Mode you try the game.",
          },
        },
        {
          kind: "callout",
          tone: "warning",
          text: {
            tr: "Play Mode'dayken yaptığın her değişiklik, Play'den çıkınca kaybolur. Yeni başlayanın en çok saat kaybettiği yer burasıdır: bir değeri Play sırasında güzelce ayarlarsın, Stop'a basarsın, her şey eski hâline döner.",
            en: "Every change you make during Play Mode is discarded when you stop. This is where beginners lose the most time: you tune a value while playing, press Stop, and it all reverts.",
          },
        },
      ],
    },
    {
      kind: "check",
      exercises: [
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Play Mode'dayken Inspector'da speed değerini 5'ten 12'ye çektin, sonra Stop'a bastın. speed kaç olur?",
            en: "While in Play Mode you changed speed from 5 to 12 in the Inspector, then pressed Stop. What is speed now?",
          },
          choices: [
            {
              text: { tr: "5", en: "5" },
              correct: true,
              feedback: {
                tr: "Doğru. Play sırasındaki değişiklikler geçicidir; Stop'a basınca sahne kaydedilmiş hâline döner.",
                en: "Right. Changes during Play are temporary; Stop restores the scene to its saved state.",
              },
            },
            {
              text: { tr: "12", en: "12" },
              correct: false,
              feedback: {
                tr: "Play Mode'daki değişiklikler kaydedilmez. Kalıcı olması için Play'den çıkıp değiştirmen gerekir.",
                en: "Changes made in Play Mode are not saved. To make it stick, stop first, then change it.",
              },
            },
            {
              text: { tr: "0, sıfırlanır", en: "0, it resets" },
              correct: false,
              feedback: {
                tr: "Sıfırlanmaz, sahnede kayıtlı olan değere döner. O da 5'ti.",
                en: "It does not reset to zero; it returns to the value stored in the scene, which was 5.",
              },
            },
            {
              text: { tr: "Unity kaydetmek isteyip istemediğini sorar", en: "Unity asks whether you want to save" },
              correct: false,
              feedback: {
                tr: "Sormaz. Sessizce eski değere döner, bu yüzden fark etmek zordur.",
                en: "It does not ask. It quietly reverts, which is exactly why this is easy to miss.",
              },
            },
          ],
        },
        {
          kind: "match",
          question: {
            tr: "Her işi doğru tarafla eşleştir",
            en: "Match each job to the side that does it",
          },
          pairs: [
            { left: { tr: "Gölge hesaplamak", en: "Calculating shadows" }, right: { tr: "Motor", en: "Engine" } },
            { left: { tr: "Düşmanın kaç can götüreceği", en: "How much damage an enemy deals" }, right: { tr: "Sen", en: "You" } },
            { left: { tr: "Dokunmayı algılamak", en: "Detecting a touch" }, right: { tr: "Motor", en: "Engine" } },
            { left: { tr: "Skor tablosunun kuralları", en: "The rules of the scoreboard" }, right: { tr: "Sen", en: "You" } },
          ],
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Karakterin zıplama yüksekliğini kalıcı olarak değiştirmek istiyorsun. Ne yaparsın?",
            en: "You want to permanently change the character's jump height. What do you do?",
          },
          choices: [
            {
              text: { tr: "Önce Stop'a basarım, sonra değeri değiştiririm", en: "Press Stop first, then change the value" },
              correct: true,
              feedback: {
                tr: "Doğru. Edit Mode'da yapılan değişiklik sahneye yazılır ve kalıcıdır.",
                en: "Right. A change made in Edit Mode is written to the scene and sticks.",
              },
            },
            {
              text: { tr: "Play sırasında değiştirip Ctrl+S ile kaydederim", en: "Change it while playing and press Ctrl+S" },
              correct: false,
              feedback: {
                tr: "Play sırasında sahne kaydedilemez. Unity bu durumda kaydetmeyi reddeder.",
                en: "The scene cannot be saved during Play. Unity refuses the save in that state.",
              },
            },
            {
              text: { tr: "Play sırasında değiştiririm, Unity hatırlar", en: "Change it while playing; Unity remembers" },
              correct: false,
              feedback: {
                tr: "Hatırlamaz. Stop'a bastığın anda değer eski hâline döner.",
                en: "It does not remember. The moment you press Stop the value reverts.",
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
          tr: "Motor çizer, hesaplar ve paketler. Kuralları sen yazarsın.",
          en: "The engine draws, calculates and packages. You write the rules.",
        },
        {
          tr: "Unity bir araç; içerik ve tasarım senden gelir.",
          en: "Unity is a tool; the content and the design come from you.",
        },
        {
          tr: "Play Mode'da yapılan değişiklik Play bitince silinir.",
          en: "Anything you change in Play Mode is discarded when Play ends.",
        },
      ],
    },
  ],
};
