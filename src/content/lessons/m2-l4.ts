import type { Lesson } from "@/content/types";

/** Ders 07 — Koşullar ve Döngüler */
export const m2l4: Lesson = {
  id: "m2-l4",
  moduleIndex: 1,
  lessonIndex: 3,
  minutes: 20,
  concepts: ["conditionals", "loops", "infinite-loop-danger"],
  steps: [
    {
      kind: "hook",
      title: { tr: "Unity donuyor ve Play'den çıkamıyorsun", en: "Unity freezes and you cannot leave Play" },
      body: {
        tr: "Play'e basıyorsun, editör kilitleniyor. Pencere kapanmıyor, Stop'a basamıyorsun. Sebep üç satır: while döngüsünün koşulu hiç değişmiyor, bu yüzden o kare hiç bitmiyor.",
        en: "You press Play and the editor locks up. The window will not close and Stop does nothing. The cause is three lines: the while loop's condition never changes, so that frame never ends.",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "for (int i = 0; i < 3; i++) döngüsü kaç satır yazar ve son yazılan sayı kaçtır?",
          en: "How many lines does for (int i = 0; i < 3; i++) print, and what is the last number?",
        },
        choices: [
          {
            text: { tr: "3 satır, son sayı 2", en: "3 lines, last number 2" },
            correct: true,
            feedback: {
              tr: "Doğru. Sayaç 0'dan başlar ve koşul i < 3 olduğu için 0, 1, 2 yazar. Dizilerde de sayma böyle başlar.",
              en: "Right. The counter starts at 0 and the condition i < 3 lets 0, 1 and 2 through. Arrays count the same way.",
            },
          },
          {
            text: { tr: "3 satır, son sayı 3", en: "3 lines, last number 3" },
            correct: false,
            feedback: {
              tr: "i = 3 olduğunda koşul bozulur ve gövde çalışmaz. 3 hiç yazılmaz.",
              en: "When i reaches 3 the condition fails and the body does not run. 3 is never printed.",
            },
          },
          {
            text: { tr: "4 satır, son sayı 3", en: "4 lines, last number 3" },
            correct: false,
            feedback: {
              tr: "Dört kez dönmesi için koşulun i <= 3 olması gerekirdi.",
              en: "Four iterations would need the condition to be i <= 3.",
            },
          },
          {
            text: { tr: "2 satır, son sayı 2", en: "2 lines, last number 2" },
            correct: false,
            feedback: {
              tr: "Sıfır da bir tur sayılır: 0, 1 ve 2 için üç tur döner.",
              en: "Zero counts as an iteration: it runs for 0, 1 and 2, so three times.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "Karar vermek ve tekrar etmek", en: "Making decisions and repeating work" },
      blocks: [
        {
          kind: "list",
          items: [
            {
              tr: "if, else if ve else bir kararı dallandırır. Karşılaştırma için ==, !=, <, >, <= ve >= kullanılır.",
              en: "if, else if and else branch a decision. Comparison uses ==, !=, <, >, <= and >=.",
            },
            {
              tr: "= atama yapar, == karşılaştırır. Bu ikisini karıştırmak yeni başlayanın en sık hatasıdır.",
              en: "= assigns and == compares. Mixing these two up is the most common beginner mistake.",
            },
            {
              tr: "&& ve, || veya, ! değil demektir. && soldaki yanlışsa sağdakini hiç çalıştırmaz; bu özellik null kontrolünde işe yarar.",
              en: "&& is and, || is or, ! is not. If the left side of && is false the right side is never evaluated, which is handy for null checks.",
            },
            {
              tr: "for sayaçla döner, foreach bir koleksiyonun her öğesi için döner. Sayaca ihtiyacın yoksa foreach daha okunur.",
              en: "for loops with a counter, foreach loops over every item in a collection. If you do not need the counter, foreach reads better.",
            },
          ],
        },
        {
          kind: "code",
          code: `private void CheckHealth()
{
    if (health <= 0)
    {
        Debug.Log("Oyun bitti");
    }
    else if (health < 30)
    {
        Debug.Log("Can azaldı");
    }
}`,
          caption: {
            tr: "Özel koşul önce gelir. health <= 0 kontrolü sona kalsaydı hiç çalışmazdı.",
            en: "The specific condition comes first. If health <= 0 were checked last it would never run.",
          },
        },
        {
          kind: "callout",
          tone: "warning",
          text: {
            tr: "while koşulu bozulmuyorsa Unity o karenin bitmesini bekler ve editör kilitlenir. Çıkış yolu görev yöneticisinden kapatmaktır, yani kaydedilmemiş her şeyi kaybetmek. Döngü yazarken koşulu değiştiren satırı yazdığından emin ol.",
            en: "If a while condition never breaks, Unity waits for that frame to finish and the editor locks up. The only way out is killing the process, which means losing everything unsaved. When you write a loop, make sure the line that changes the condition is there.",
          },
        },
      ],
    },
    {
      kind: "check",
      exercises: [
        {
          kind: "spot",
          question: {
            tr: "Bu kod her zaman Oyun bitti yazıyor. Hangi satır hatalı?",
            en: "This code always prints Oyun bitti. Which line is wrong?",
          },
          lines: [
            "private void CheckHealth()",
            "{",
            "    if (health = 0)",
            "    {",
            "        Debug.Log(\"Oyun bitti\");",
            "    }",
            "}",
          ],
          correctLine: 2,
          feedback: {
            tr: "if (health = 0) karşılaştırma değil atama yapıyor. Doğrusu if (health == 0). Tek karakterlik fark, tamamen farklı davranış.",
            en: "if (health = 0) assigns instead of comparing. It should be if (health == 0). One character apart, completely different behaviour.",
          },
        },
        {
          kind: "order",
          question: {
            tr: "Bu koşulları doğru sıraya diz: hangisi önce kontrol edilmeli?",
            en: "Put these conditions in the right order: which should be checked first?",
          },
          items: [
            { tr: "if (health <= 0) — öldü", en: "if (health <= 0) — dead" },
            { tr: "else if (health < 30) — can azaldı", en: "else if (health < 30) — low health" },
            { tr: "else — durum normal", en: "else — everything normal" },
          ],
          feedback: {
            tr: "En özel koşul en başa gelir. health < 30 önce yazılsaydı, canı sıfır olan da o dala düşer ve öldü kontrolü hiç çalışmazdı.",
            en: "The most specific condition goes first. With health < 30 written first, a dead character would fall into that branch and the death check would never run.",
          },
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "while (true) döngüsünün içinde break yoksa Unity'de ne olur?",
            en: "If a while (true) loop has no break, what happens in Unity?",
          },
          choices: [
            {
              text: { tr: "Editör donar, Play'den çıkılamaz", en: "The editor freezes and you cannot leave Play" },
              correct: true,
              feedback: {
                tr: "Doğru. Motor kareyi bitiremez. Kaydedilmemiş çalışma kaybolur, bu yüzden döngü yazarken dikkatli olunur.",
                en: "Right. The engine cannot finish the frame. Unsaved work is lost, which is why loops deserve care.",
              },
            },
            {
              text: { tr: "Unity döngüyü otomatik keser", en: "Unity breaks the loop automatically" },
              correct: false,
              feedback: {
                tr: "Kesmez. Motorun senin döngünün ne zaman bitmesi gerektiğine dair bir fikri yok.",
                en: "It does not. The engine has no idea when your loop is supposed to end.",
              },
            },
            {
              text: { tr: "Yalnızca o script durur", en: "Only that script stops" },
              correct: false,
              feedback: {
                tr: "Tüm kare o script'i bekler. Bir script'in takılması editörün tamamını durdurur.",
                en: "The whole frame waits on that script. One stuck script stops the entire editor.",
              },
            },
          ],
        },
        {
          kind: "code",
          question: {
            tr: "0'dan 9'a kadar olan sayılardan yalnızca çift olanları Console'a yazdır.",
            en: "Print only the even numbers from 0 to 9 to the Console.",
          },
          starter: `using UnityEngine;

public class Evens : MonoBehaviour
{
    private void Start()
    {
        // Döngüyü buraya yaz
    }
}`,
          checks: [
            {
              pattern: "for\\s*\\(",
              expect: true,
              message: {
                tr: "Bir for döngüsü kurulmuş.",
                en: "A for loop is in place.",
              },
            },
            {
              pattern: "%\\s*2\\s*==\\s*0",
              expect: true,
              message: {
                tr: "Çift sayı kontrolü % 2 == 0 ile yapılıyor.",
                en: "The even check uses % 2 == 0.",
              },
            },
            {
              pattern: "while\\s*\\(\\s*true\\s*\\)",
              expect: false,
              message: {
                tr: "while (true) kullanma. Sayısı belli bir tekrar için for döngüsü doğru araçtır.",
                en: "Do not use while (true). When the number of repetitions is known, for is the right tool.",
              },
            },
            {
              pattern: "Debug\\s*\\.\\s*Log\\s*\\(",
              expect: true,
              message: {
                tr: "Sayılar Console'a yazdırılıyor.",
                en: "The numbers are printed to the Console.",
              },
            },
          ],
          solvedMessage: {
            tr: "% işleci kalanı verir. Bu kalıp sırayla iş yaptırmakta, kareyi atlamakta ve şerit hesabında sürekli karşına çıkacak.",
            en: "The % operator gives the remainder. You will meet this pattern again for alternating work, frame skipping and lane maths.",
          },
        },
      ],
    },
    {
      kind: "summary",
      points: [
        {
          tr: "= atar, == karşılaştırır.",
          en: "= assigns, == compares.",
        },
        {
          tr: "En özel koşul en başa yazılır, yoksa hiç çalışmaz.",
          en: "The most specific condition goes first, otherwise it never runs.",
        },
        {
          tr: "Koşulu değiştiren satırı unutursan Unity donar.",
          en: "Forget the line that changes the condition and Unity freezes.",
        },
      ],
    },
  ],
};
