import type { Lesson } from "@/content/types";

/** Ders 08 — Metotlar ve Sınıflar */
export const m2l5: Lesson = {
  id: "m2-l5",
  moduleIndex: 1,
  lessonIndex: 4,
  minutes: 22,
  concepts: ["methods", "parameters", "scope", "refactor-extract"],
  steps: [
    {
      kind: "hook",
      title: { tr: "Aynı altı satır üç yerde", en: "The same six lines in three places" },
      body: {
        tr: "80 satırlık bir Update. İçinde aynı altı satır üç kez tekrar ediyor. Hasar hesabı değişecek, üç yerde birden değiştirmen gerekiyor ve birini unutuyorsun. Hata da haftalar sonra ortaya çıkıyor.",
        en: "An 80-line Update with the same six lines repeated three times. The damage calculation changes, you have to edit all three, and you miss one. The bug surfaces weeks later.",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "Dönüş tipi void olan bir metodun içinde return; yazılabilir mi?",
          en: "Can you write return; inside a method whose return type is void?",
        },
        choices: [
          {
            text: { tr: "Evet, metottan erken çıkmak için", en: "Yes, to leave the method early" },
            correct: true,
            feedback: {
              tr: "Doğru. Değer döndürmeden çıkar. Koşul sağlanmıyorsa geri kalanı hiç çalıştırmamak için çok kullanılır.",
              en: "Right. It exits without returning a value. It is used constantly to skip the rest of a method when a condition is not met.",
            },
          },
          {
            text: { tr: "Hayır, void metot return alamaz", en: "No, a void method cannot take return" },
            correct: false,
            feedback: {
              tr: "Alamayacağı şey bir değer döndürmek. Boş return; tamamen geçerlidir.",
              en: "What it cannot do is return a value. A bare return; is perfectly valid.",
            },
          },
          {
            text: { tr: "Sadece return null; yazılabilir", en: "Only return null; is allowed" },
            correct: false,
            feedback: {
              tr: "null da bir değerdir; void metot hiçbir değer döndüremez.",
              en: "null is still a value; a void method returns no value at all.",
            },
          },
          {
            text: { tr: "Derlenir ama çalışmaz", en: "It compiles but does nothing" },
            correct: false,
            feedback: {
              tr: "Çalışır ve o noktada metottan çıkar.",
              en: "It runs and exits the method at that point.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "İşi bir isme bağlamak", en: "Giving work a name" },
      blocks: [
        {
          kind: "text",
          text: {
            tr: "Metot, isimlendirilmiş bir iştir. Adı ne yaptığını söyler ve fiil olur: TakeDamage, Jump, SpawnEnemy. Health() değil TakeDamage(); PlayerStuff() değil ResetPlayer().",
            en: "A method is a named piece of work. Its name says what it does and it is a verb: TakeDamage, Jump, SpawnEnemy. Not Health() but TakeDamage(); not PlayerStuff() but ResetPlayer().",
          },
        },
        {
          kind: "list",
          items: [
            {
              tr: "Parametre, metodun dışarıdan aldığı bilgidir: TakeDamage(int amount). Parametre yoksa metot her seferinde aynı şeyi yapar.",
              en: "A parameter is what the method takes from outside: TakeDamage(int amount). With no parameter the method does the same thing every time.",
            },
            {
              tr: "Dönüş tipi metodun ne geri verdiğini söyler. void hiçbir şey vermez; int, bool, float bir değer verir.",
              en: "The return type says what comes back. void gives nothing; int, bool or float give a value.",
            },
            {
              tr: "Kapsam: metot içinde tanımlanan değişken dışarıdan görünmez. Alan class düzeyinde, yerel değişken metot düzeyindedir.",
              en: "Scope: a variable declared inside a method is invisible outside it. A field lives at class level, a local variable at method level.",
            },
          ],
        },
        {
          kind: "code",
          code: `private void TakeDamage(int amount)
{
    if (!isAlive) return;

    health = Mathf.Max(health - amount, 0);
    healthBar.SetValue(health);

    if (health == 0) Die();
}`,
          caption: {
            tr: "Erken çıkış ilk satırda. Mathf.Max canın sıfırın altına düşmesini engelliyor.",
            en: "The early exit is the first line. Mathf.Max keeps health from dropping below zero.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Tekrar eden bloğu bir metoda taşımaya çıkarma denir. Üç yerden aynı metodu çağırırsın ve değişiklik artık tek yerde yapılır. Aynı kodu ikinci kez yazıyorsan, çıkarma vakti gelmiş demektir.",
            en: "Moving a repeated block into a method is called extraction. You call the same method from three places and the change now happens in one spot. If you are writing the same code a second time, it is time to extract.",
          },
        },
      ],
    },
    {
      kind: "check",
      exercises: [
        {
          kind: "fill",
          question: {
            tr: "Metot imzasını tamamla: canın sıfırdan büyük olup olmadığını söyleyen metot.",
            en: "Complete the signature: a method that reports whether health is above zero.",
          },
          template: `private ___ IsAlive()
{
    ___ health > 0;
}`,
          answers: ["bool", "return"],
          distractors: ["void", "int", "break", "yield"],
          feedback: {
            tr: "Bir soruya cevap veren metot değer döndürür. void olsaydı cevabı hiçbir yere veremezdi.",
            en: "A method that answers a question returns a value. As void it would have nowhere to put the answer.",
          },
        },
        {
          kind: "spot",
          question: {
            tr: "Bu metot derlenmiyor. Hangi satır hatalı?",
            en: "This method does not compile. Which line is wrong?",
          },
          lines: [
            "private void Heal(int amount)",
            "{",
            "    health += amount;",
            "    return health;",
            "}",
          ],
          correctLine: 3,
          feedback: {
            tr: "Metot void olduğu için değer döndüremez. Ya dönüş tipini int yap ya da return health; satırını sil.",
            en: "The method is void, so it cannot return a value. Either change the return type to int or drop the return health; line.",
          },
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Bir metot içinde tanımlanan int temp değişkeni başka bir metottan okunabilir mi?",
            en: "Can an int temp declared inside one method be read from another method?",
          },
          choices: [
            {
              text: { tr: "Hayır, kapsamı o metotla sınırlı", en: "No, its scope ends with that method" },
              correct: true,
              feedback: {
                tr: "Doğru. İki metodun paylaşması gerekiyorsa değişken class düzeyinde bir alan olmalı.",
                en: "Right. If two methods need to share it, the variable has to be a field at class level.",
              },
            },
            {
              text: { tr: "Evet, aynı class içindeyse okunur", en: "Yes, as long as they are in the same class" },
              correct: false,
              feedback: {
                tr: "Aynı class içinde olmak yetmez. Yerel değişken metot bitince yok olur.",
                en: "Being in the same class is not enough. A local variable ceases to exist when the method ends.",
              },
            },
            {
              text: { tr: "Yalnızca public yapılırsa", en: "Only if it is made public" },
              correct: false,
              feedback: {
                tr: "Yerel değişkene erişim belirleyici yazılamaz; sorun erişim değil kapsam.",
                en: "A local variable cannot take an access modifier; the issue is scope, not access.",
              },
            },
          ],
        },
        {
          kind: "code",
          question: {
            tr: "TakeDamage(int amount) metodunu yaz. Karakter ölüyse hiçbir şey yapmasın, can sıfırın altına düşmesin.",
            en: "Write a TakeDamage(int amount) method. Do nothing if the character is dead, and never let health go below zero.",
          },
          starter: `using UnityEngine;

public class Health : MonoBehaviour
{
    [SerializeField] private int health = 100;
    private bool isAlive = true;

    // TakeDamage metodunu buraya yaz
}`,
          checks: [
            {
              pattern: "void\\s+TakeDamage\\s*\\(\\s*int\\s+\\w+\\s*\\)",
              expect: true,
              message: {
                tr: "TakeDamage metodu bir int parametre alıyor.",
                en: "TakeDamage takes an int parameter.",
              },
            },
            {
              pattern: "if\\s*\\(\\s*!\\s*isAlive\\s*\\)\\s*return\\s*;",
              expect: true,
              message: {
                tr: "Ölü karakter için erken çıkış var.",
                en: "There is an early exit for a dead character.",
              },
            },
            {
              pattern: "Mathf\\s*\\.\\s*Max\\s*\\(|if\\s*\\(\\s*health\\s*<\\s*0\\s*\\)",
              expect: true,
              message: {
                tr: "Can sıfırın altına düşmüyor.",
                en: "Health is kept from going below zero.",
              },
            },
          ],
          solvedMessage: {
            tr: "Bu metot artık üç yerden çağrılabilir ve hasar kuralı değiştiğinde tek satır güncellenir. Modül 2 bitti; sırada Unity'nin yaşam döngüsü var.",
            en: "This method can now be called from three places, and when the damage rule changes you edit one line. That is the end of Module 2; Unity's lifecycle comes next.",
          },
        },
      ],
    },
    {
      kind: "summary",
      points: [
        {
          tr: "Metot adı fiil olur ve ne yaptığını söyler.",
          en: "A method name is a verb and says what it does.",
        },
        {
          tr: "void içinde return; erken çıkıştır.",
          en: "Inside void, return; is an early exit.",
        },
        {
          tr: "Aynı kodu ikinci kez yazıyorsan bir metoda çıkarma vaktidir.",
          en: "Writing the same code a second time means it is time to extract a method.",
        },
      ],
    },
  ],
};
