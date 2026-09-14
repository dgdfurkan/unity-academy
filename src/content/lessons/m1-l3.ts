import type { Lesson } from "@/content/types";

/** Ders 03 — Hangi Kod Editörü? Rider, Visual Studio, VS Code */
export const m1l3: Lesson = {
  id: "m1-l3",
  moduleIndex: 0,
  lessonIndex: 2,
  minutes: 12,
  concepts: ["external-editor", "intellisense", "breakpoint"],
  steps: [
    {
      kind: "hook",
      title: {
        tr: "Aynı hata, üç farklı an",
        en: "The same mistake, caught at three different moments",
      },
      body: {
        tr: "Aynı yazım hatası üç ekranda. Birinde yazarken altı kırmızı çiziliyor. Birinde ancak kaydedince görünüyor. Üçüncüsünde hiç görünmüyor; hatayı Unity'de Play'e basınca Console'da buluyorsun. Aradaki fark editörün kendisi.",
        en: "The same typo on three screens. On one it is underlined in red as you type. On another it only appears when you save. On the third it never appears, and you find it in Unity's Console after pressing Play. The difference is the editor.",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "Unity projesindeki C# kodunu kim derler?",
          en: "Who compiles the C# code in a Unity project?",
        },
        choices: [
          {
            text: { tr: "Unity", en: "Unity" },
            correct: true,
            feedback: {
              tr: "Doğru. Editör yazmanı kolaylaştırır ve hataları önceden gösterir, ama derleyen taraf Unity'dir. Editörü değiştirmek oyunu değiştirmez.",
              en: "Right. The editor helps you write and flags mistakes early, but Unity is what compiles. Switching editors does not change the game.",
            },
          },
          {
            text: { tr: "Rider", en: "Rider" },
            correct: false,
            feedback: {
              tr: "Rider kodu çözümler ve hataları önceden gösterir; projeyi derleyen Unity'dir.",
              en: "Rider analyses the code and flags errors early; Unity is what compiles the project.",
            },
          },
          {
            text: { tr: "Visual Studio", en: "Visual Studio" },
            correct: false,
            feedback: {
              tr: "Visual Studio başka projeleri derleyebilir ama Unity projesinde derleme Unity'nin işidir.",
              en: "Visual Studio compiles other kinds of projects, but in a Unity project compilation belongs to Unity.",
            },
          },
          {
            text: { tr: "İşletim sistemi", en: "The operating system" },
            correct: false,
            feedback: {
              tr: "İşletim sistemi derleme yapmaz, yalnızca çalıştırır.",
              en: "The operating system does not compile anything; it only runs what is built.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "Editör sana ne verir", en: "What an editor gives you" },
      blocks: [
        {
          kind: "list",
          items: [
            {
              tr: "IntelliSense: yazarken tamamlama. Bir nesnenin hangi metotları olduğunu ezberlemek zorunda kalmazsın.",
              en: "IntelliSense: completion as you type. You stop having to memorise which methods an object has.",
            },
            {
              tr: "Hata altı çizgisi: kod derlenmeden önce sorunlu satırı gösterir.",
              en: "Error underlines: the broken line is shown before the code is ever compiled.",
            },
            {
              tr: "Go to Definition: bir ismin nerede tanımlandığına atlar. Büyük projede en çok kullandığın kısayol olur.",
              en: "Go to Definition: jumps to where a name is declared. In a large project this becomes your most used shortcut.",
            },
            {
              tr: "Debugger ve Breakpoint: kodu belirli bir satırda durdurup o andaki değerleri incelersin.",
              en: "Debugger and Breakpoint: pause the code on a given line and inspect the values at that moment.",
            },
          ],
        },
        {
          kind: "table",
          head: [
            { tr: "", en: "" },
            { tr: "Rider", en: "Rider" },
            { tr: "Visual Studio", en: "Visual Studio" },
            { tr: "VS Code", en: "VS Code" },
          ],
          rows: [
            [
              { tr: "Unity entegrasyonu", en: "Unity integration" },
              { tr: "En güçlü", en: "Strongest" },
              { tr: "Güçlü", en: "Strong" },
              { tr: "Eklenti ile", en: "Via extension" },
            ],
            [
              { tr: "Hız ve bellek", en: "Speed and memory" },
              { tr: "Ağır", en: "Heavy" },
              { tr: "Orta", en: "Medium" },
              { tr: "Hafif", en: "Light" },
            ],
            [
              { tr: "Fiyat", en: "Price" },
              { tr: "Ücretli, öğrenciye ücretsiz", en: "Paid, free for students" },
              { tr: "Community ücretsiz", en: "Community is free" },
              { tr: "Ücretsiz", en: "Free" },
            ],
          ],
        },
        {
          kind: "text",
          text: {
            tr: "Bağlamak için: Edit > Preferences > External Tools > External Script Editor. Seçtikten sonra Regenerate project files düğmesine bas, yoksa editör projeyi tanımaz ve tamamlama çalışmaz.",
            en: "To connect one: Edit > Preferences > External Tools > External Script Editor. After choosing, press Regenerate project files, otherwise the editor does not recognise the project and completion will not work.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "İlk Breakpoint'i koymak: satırın soluna tıkla, editörden Unity'ye Attach ol, Play'e bas. Kod o satırda durur ve değişkenlerin o andaki değerini görürsün.",
            en: "Setting your first Breakpoint: click to the left of the line, attach the editor to Unity, then press Play. Execution pauses on that line and you can read every value at that instant.",
          },
        },
        {
          kind: "callout",
          tone: "info",
          text: {
            tr: "Breakpoint ile Debug.Log arasındaki fark: Breakpoint zamanı durdurur ve her şeyi incelemene izin verir; Debug.Log yalnızca senin önceden yazdığın şeyi yazar.",
            en: "The difference between a Breakpoint and Debug.Log: a Breakpoint stops time and lets you inspect everything; Debug.Log only prints what you thought to ask for in advance.",
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
            tr: "8 GB belleği olan bir dizüstünde çalışıyorsun ve editör sürekli takılıyor. Hangisini seçersin?",
            en: "You work on a laptop with 8 GB of memory and the editor keeps stalling. Which do you choose?",
          },
          choices: [
            {
              text: { tr: "VS Code", en: "VS Code" },
              correct: true,
              feedback: {
                tr: "Doğru. Hafif olan kazanır. Üçü de işi görür; makineni zorlamayan en iyisidir.",
                en: "Right. The light one wins. All three do the job; the best one is the one your machine can run.",
              },
            },
            {
              text: { tr: "Rider", en: "Rider" },
              correct: false,
              feedback: {
                tr: "Rider en güçlü çözümlemeyi yapar ama en çok belleği de o ister. Takılan bir makinede işini yavaşlatır.",
                en: "Rider does the deepest analysis but also wants the most memory. On a struggling machine it slows you down.",
              },
            },
            {
              text: { tr: "Visual Studio", en: "Visual Studio" },
              correct: false,
              feedback: {
                tr: "VS Code'dan ağırdır. Makine zorlanıyorsa en hafif olanla başlamak daha mantıklı.",
                en: "Heavier than VS Code. If the machine is struggling, starting with the lightest option makes more sense.",
              },
            },
          ],
        },
        {
          kind: "match",
          question: {
            tr: "Her aracı yaptığı işle eşleştir",
            en: "Match each tool to what it does",
          },
          pairs: [
            { left: { tr: "IntelliSense", en: "IntelliSense" }, right: { tr: "Yazarken tamamlar", en: "Completes as you type" } },
            { left: { tr: "Breakpoint", en: "Breakpoint" }, right: { tr: "Kodu bir satırda durdurur", en: "Pauses code on a line" } },
            { left: { tr: "Go to Definition", en: "Go to Definition" }, right: { tr: "Tanımın olduğu yere atlar", en: "Jumps to the declaration" } },
            { left: { tr: "Console", en: "Console" }, right: { tr: "Motorun mesajlarını gösterir", en: "Shows the engine's messages" } },
          ],
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Bir değişkenin çalışma anındaki değerini görmek istiyorsun ama nereye Debug.Log koyacağını bilmiyorsun. Ne yaparsın?",
            en: "You want to see a variable's value at runtime but you do not know where to put a Debug.Log. What do you do?",
          },
          choices: [
            {
              text: { tr: "Şüphelendiğim satıra Breakpoint koyarım", en: "Put a Breakpoint on the line I suspect" },
              correct: true,
              feedback: {
                tr: "Doğru. Breakpoint o anda görünen her şeyi gösterir; ne arayacağını önceden bilmen gerekmez.",
                en: "Right. A Breakpoint shows everything in scope at that moment; you do not need to know in advance what to look for.",
              },
            },
            {
              text: { tr: "Her satıra Debug.Log yazarım", en: "Put a Debug.Log on every line" },
              correct: false,
              feedback: {
                tr: "Çalışır ama Console'u doldurur ve sonra hepsini temizlemen gerekir. Breakpoint daha hızlı.",
                en: "It works but floods the Console and you then have to clean them all up. A Breakpoint is faster.",
              },
            },
            {
              text: { tr: "Kodu yeniden yazarım", en: "Rewrite the code" },
              correct: false,
              feedback: {
                tr: "Sorunun nerede olduğunu bilmeden yeniden yazmak aynı hatayı tekrar üretir.",
                en: "Rewriting without knowing where the problem is usually reproduces the same mistake.",
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
          tr: "Editör yazar ve uyarır; derleyen Unity'dir.",
          en: "The editor writes and warns; Unity compiles.",
        },
        {
          tr: "Seçim makineye ve bütçeye göre yapılır, üçü de işi görür.",
          en: "Pick by machine and budget; all three do the job.",
        },
        {
          tr: "Breakpoint zamanı durdurur, Debug.Log yalnızca yazar.",
          en: "A Breakpoint stops time; Debug.Log only prints.",
        },
      ],
    },
  ],
};
