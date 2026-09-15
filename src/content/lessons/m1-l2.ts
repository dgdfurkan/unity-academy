import type { Lesson } from "@/content/types";

/** Ders 02 — Editör Turu: Altı Pencere */
export const m1l2: Lesson = {
  id: "m1-l2",
  moduleIndex: 0,
  lessonIndex: 1,
  minutes: 16,
  concepts: ["editor-windows", "hierarchy-vs-project", "console-basics"],
  steps: [
    {
      kind: "hook",
      title: {
        tr: "Altı pencere, bir tane de sık yapılan hata",
        en: "Six windows and one very common mistake",
      },
      body: {
        tr: "Unity'yi ilk açtığında ekranda altı ayrı pencere görürsün ve hepsi aynı anda bir şeyler gösterir. Bu yoğunluk ilk günlerde yorucudur, ama aslında her pencerenin tek bir işi vardır.\n\nBu dersin asıl konusu ise bu altı pencereden ikisinin arasındaki farktır. Hierarchy sahnedeki nesneleri listeler, Project diskteki dosyaları. Çoğu yeni başlayan bu ikisini aynı sanır ve iki tür hata yapar: ya sahnedeki bir nesneyi silip dosyanın da silindiğini zanneder, ya da diskten bir dosya silip sahnedeki her şeyin bozulmasına şaşırır. Dersin sonunda bu farkı bir daha unutmayacaksın.",
        en: "The first time you open Unity you see six separate windows all showing you something at once. That density is tiring in the early days, but each window really does have exactly one job.\n\nThe real subject of this lesson is the difference between two of those six. The Hierarchy lists the objects in the scene; the Project lists the files on disk. Most beginners treat these as the same thing and make one of two mistakes: either they delete an object from the scene and assume the file went with it, or they delete a file from disk and are surprised when the whole scene breaks. By the end of this lesson that difference will stick.",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "Hierarchy'deki bir GameObject'i sildin. Project klasöründeki dosyalara ne olur?",
          en: "You deleted a GameObject from the Hierarchy. What happens to the files in the Project folder?",
        },
        choices: [
          {
            text: { tr: "Hiçbir şey olmaz", en: "Nothing happens" },
            correct: true,
            feedback: {
              tr: "Doğru. Hierarchy sahnedeki örnekleri gösterir. Örneği silmek diskteki kalıbı etkilemez.",
              en: "Right. The Hierarchy shows instances in the scene. Deleting an instance leaves the asset on disk untouched.",
            },
          },
          {
            text: { tr: "İlgili dosya da silinir", en: "The matching file is deleted too" },
            correct: false,
            feedback: {
              tr: "Silinmez. Aksi olsaydı bir sahneden nesne silmek projedeki her sahneyi bozardı.",
              en: "It is not. If it were, removing one object from a scene would break every other scene in the project.",
            },
          },
          {
            text: { tr: "Dosya çöp kutusuna gider", en: "The file goes to the trash" },
            correct: false,
            feedback: {
              tr: "Hierarchy ile Project ayrı dünyalar. Biri sahneyi, diğeri diski gösterir.",
              en: "Hierarchy and Project are separate worlds. One shows the scene, the other shows disk.",
            },
          },
          {
            text: { tr: "Unity onay sorar", en: "Unity asks for confirmation" },
            correct: false,
            feedback: {
              tr: "Sormaz, çünkü ortada silinecek bir dosya yok.",
              en: "It does not ask, because no file is being deleted.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "Altı pencere ve ne işe yaradıkları", en: "Six windows and what each is for" },
      blocks: [
        {
          kind: "table",
          head: [
            { tr: "Pencere", en: "Window" },
            { tr: "Ne için", en: "What it is for" },
            { tr: "Sık yapılan hata", en: "Common mistake" },
          ],
          rows: [
            [
              { tr: "Scene", en: "Scene" },
              { tr: "Sahneyi kurarsın", en: "You build the scene" },
              { tr: "Play sırasında burada düzenlemek", en: "Editing here while playing" },
            ],
            [
              { tr: "Game", en: "Game" },
              { tr: "Oyuncunun gördüğü", en: "What the player sees" },
              { tr: "Scene ile karıştırmak", en: "Confusing it with Scene" },
            ],
            [
              { tr: "Hierarchy", en: "Hierarchy" },
              { tr: "Bu sahnedeki nesneler", en: "Objects in this scene" },
              { tr: "Diskteki dosyalarla aynı sanmak", en: "Treating it as the files on disk" },
            ],
            [
              { tr: "Inspector", en: "Inspector" },
              { tr: "Seçili nesnenin ayarları", en: "Settings of the selected object" },
              { tr: "Seçim değişince panelin de değiştiğini fark etmemek", en: "Not noticing it follows the selection" },
            ],
            [
              { tr: "Project", en: "Project" },
              { tr: "Diskteki tüm varlıklar", en: "Every asset on disk" },
              { tr: "Buradan silmenin geri dönüşü olmadığını bilmemek", en: "Not knowing deletion here is permanent" },
            ],
            [
              { tr: "Console", en: "Console" },
              { tr: "Motorun sana söyledikleri", en: "What the engine is telling you" },
              { tr: "Hatayı okumadan kapatmak", en: "Clearing errors without reading them" },
            ],
          ],
        },
        {
          kind: "sim",
          variant: "editor-tour",
          caption: {
            tr: "Altı pencereye tek tek dokun. Hangisinin ne işe yaradığını gör.",
            en: "Tap each of the six windows and see what it is for.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Şimdi asıl konuya gelelim. Project'teki bir Prefab bir kalıptır; Hierarchy'deki her kopya o kalıptan üretilmiş bir örnektir. Bir düşman prefab'ı düşün: sahnede on tane düşman varsa, diskte tek bir Enemy.prefab dosyası ve sahnede ona bağlı on örnek vardır.",
            en: "Now to the main point. A Prefab in the Project is a mould, and every copy in the Hierarchy is an instance made from it. Picture an enemy prefab: with ten enemies in the scene there is one Enemy.prefab file on disk and ten instances in the scene linked to it.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Bu bağ çok işine yarar. Kalıptaki düşmanın canını 100'den 80'e düşürürsen sahnedeki on düşmanın da canı düşer. Tek tek gezmen gerekmez. Ama aynı bağ tehlikeli tarafı da getirir: kalıbı silersen on örnek birden bozulur.",
            en: "That link is enormously useful. Drop the enemy's health from 100 to 80 on the mould and all ten enemies in the scene follow. You never visit them one by one. But the same link carries the danger: delete the mould and all ten instances break at once.",
          },
        },
        {
          kind: "sim",
          variant: "hierarchy-project",
          caption: {
            tr: "Önce soldan bir örnek sil, sonra sağdaki kalıbı sil. Farkı gör.",
            en: "First delete an instance on the left, then delete the mould on the right. Watch the difference.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Console üç şey gösterir: Log bilgi verir, Warning dikkat çeker, Error çalışmadığını söyler. Bir hata satırı dört parçadan oluşur: mesaj, dosya adı, satır numarası ve çağrı yığını.",
            en: "The Console shows three things: Log informs, Warning cautions, Error says something did not run. An error line has four parts: the message, the file name, the line number and the call stack.",
          },
        },
        {
          kind: "sim",
          variant: "console",
          caption: {
            tr: "Üç satıra da dokun. Log, Warning ve Error arasındaki farkı gör.",
            en: "Tap all three lines. See the difference between Log, Warning and Error.",
          },
        },
        {
          kind: "callout",
          tone: "info",
          text: {
            tr: "Console'daki bir hata satırına çift tıklamak kod editörünü tam o satırda açar. Hatayı gözle aramak yerine satırın üstüne tıkla; bu alışkanlık sana yüzlerce dakika kazandırır.",
            en: "Double-clicking an error in the Console opens your code editor on that exact line. Instead of hunting for the error by eye, click the line; this habit will save you hundreds of minutes.",
          },
        },
      ],
    },
    {
      kind: "check",
      exercises: [
        {
          kind: "sim",
          variant: "hierarchy-project",
          question: {
            tr: "Önce bir örneği, sonra kalıbı sil. İkisinin sonucu arasındaki farkı gör.",
            en: "Delete an instance first, then the mould. See how the two outcomes differ.",
          },
          feedback: {
            tr: "Sahnedeki örnek ile diskteki kalıp ayrı şeyler. Örnek silmek geri alınabilir bir iştir; kalıp silmek o kalıba bağlı her şeyi bozar.",
            en: "An instance in the scene and a mould on disk are separate things. Deleting an instance is easy to undo; deleting the mould breaks everything linked to it.",
          },
        },
        {
          kind: "sim",
          variant: "editor-tour",
          question: {
            tr: "Altı pencereye de dokun ve ne işe yaradıklarını oku.",
            en: "Tap all six windows and read what each one does.",
          },
          feedback: {
            tr: "Her pencerenin tek bir işi var. Bir şeyi nerede yapacağını bilmek, Unity'de hız kazanmanın ilk adımı.",
            en: "Each window has exactly one job. Knowing where to do a thing is the first step to working quickly in Unity.",
          },
        },
        {
          kind: "match",
          question: {
            tr: "Her işi yapılacağı pencereyle eşleştir",
            en: "Match each task to the window where you do it",
          },
          pairs: [
            { left: { tr: "Bir materyalin rengini değiştirmek", en: "Changing a material's colour" }, right: { tr: "Inspector", en: "Inspector" } },
            { left: { tr: "Sahnedeki nesneleri listelemek", en: "Listing the objects in the scene" }, right: { tr: "Hierarchy", en: "Hierarchy" } },
            { left: { tr: "Bir hatanın hangi satırda olduğunu bulmak", en: "Finding which line an error came from" }, right: { tr: "Console", en: "Console" } },
            { left: { tr: "Projeye yeni bir görsel eklemek", en: "Adding a new image to the project" }, right: { tr: "Project", en: "Project" } },
          ],
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Project'ten bir Prefab'ı sildin. Sahnedeki üç örneğine ne olur?",
            en: "You deleted a Prefab from the Project. What happens to its three instances in the scene?",
          },
          choices: [
            {
              text: { tr: "Bozulurlar, yerlerinde Missing Prefab kalır", en: "They break and leave a Missing Prefab behind" },
              correct: true,
              feedback: {
                tr: "Doğru. Örnekler kalıbı işaret ediyordu; kalıp gidince bağlantı kırılır.",
                en: "Right. The instances pointed at the mould; with the mould gone the link breaks.",
              },
            },
            {
              text: { tr: "Hiçbir şey olmaz, kopyaları bağımsızdır", en: "Nothing, the copies are independent" },
              correct: false,
              feedback: {
                tr: "Bağımsız değiller. Prefab örneği kalıba bağlı kalır; zaten toplu güncelleme bu sayede çalışır.",
                en: "They are not independent. A Prefab instance stays linked to the mould; that link is what makes bulk updates work.",
              },
            },
            {
              text: { tr: "Sahnedeki örnekler de silinir", en: "The instances are deleted too" },
              correct: false,
              feedback: {
                tr: "Silinmezler, yerlerinde bozuk bir nesne kalır. Bu yüzden hata geç fark edilir.",
                en: "They are not deleted; a broken object stays in their place, which is why this gets noticed late.",
              },
            },
          ],
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Inspector boş görünüyor. En olası sebep ne?",
            en: "The Inspector looks empty. What is the most likely reason?",
          },
          choices: [
            {
              text: { tr: "Hiçbir şey seçili değil", en: "Nothing is selected" },
              correct: true,
              feedback: {
                tr: "Doğru. Inspector her zaman seçili olanı gösterir; seçim yoksa gösterecek bir şey de yoktur.",
                en: "Right. The Inspector always shows the current selection; with no selection there is nothing to show.",
              },
            },
            {
              text: { tr: "Unity çöktü", en: "Unity crashed" },
              correct: false,
              feedback: {
                tr: "Çökmedi. Inspector'ın boş olması normal bir durumdur.",
                en: "It did not. An empty Inspector is a normal state.",
              },
            },
            {
              text: { tr: "Sahne kaydedilmemiş", en: "The scene is unsaved" },
              correct: false,
              feedback: {
                tr: "Kaydedilmemiş sahne Inspector'ı etkilemez, yalnızca başlıkta bir yıldız çıkar.",
                en: "An unsaved scene does not affect the Inspector; it only adds an asterisk to the title.",
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
          tr: "Hierarchy sahneyi, Project diski gösterir. Aynı şey değiller.",
          en: "The Hierarchy shows the scene, the Project shows disk. They are not the same.",
        },
        {
          tr: "Inspector her zaman seçili olanı gösterir.",
          en: "The Inspector always shows whatever is selected.",
        },
        {
          tr: "Console'daki kırmızı satır okunmadan kapatılmaz.",
          en: "A red line in the Console does not get cleared before it is read.",
        },
      ],
    },
  ],
};
