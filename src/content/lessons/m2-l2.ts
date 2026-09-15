import type { Lesson } from "@/content/types";

/** Ders 05 — Değişkenler ve Tipler: int, float, bool, string */
export const m2l2: Lesson = {
  id: "m2-l2",
  moduleIndex: 1,
  lessonIndex: 1,
  minutes: 18,
  concepts: ["value-types", "int-division", "float-suffix"],
  steps: [
    {
      kind: "hook",
      title: { tr: "Aynı tip, iki farklı tepki", en: "Same type, two different reactions" },
      body: {
        tr: "float speed = 8; yazıyorsun, sorun yok. float speed = 8.5; yazıyorsun, altı kırmızı çiziliyor. İkisi de float. Derleyici neden birine kızıyor?",
        en: "You write float speed = 8; and nothing complains. You write float speed = 8.5; and it gets a red underline. Both are float. Why does the compiler object to one of them?",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "int health = 100; int result = health / 3; sonucunda result kaç olur?",
          en: "Given int health = 100; int result = health / 3; what is result?",
        },
        choices: [
          {
            text: { tr: "33", en: "33" },
            correct: true,
            feedback: {
              tr: "Doğru. int bölü int işleminin sonucu da int'tir. Ondalık kısım yuvarlanmaz, atılır. Can ve hasar hesabında en sık görülen sessiz hata budur.",
              en: "Right. An int divided by an int produces an int. The fractional part is not rounded, it is discarded. This is the most common silent bug in health and damage maths.",
            },
          },
          {
            text: { tr: "33.33", en: "33.33" },
            correct: false,
            feedback: {
              tr: "Sonuç int olduğu için ondalık tutulamaz. Ondalık istiyorsan taraflardan birinin float olması gerekir: health / 3f.",
              en: "The result is an int, so it cannot hold a fraction. If you want one, make a side float: health / 3f.",
            },
          },
          {
            text: { tr: "34", en: "34" },
            correct: false,
            feedback: {
              tr: "Yuvarlama yok. 33.33 değeri aşağı kesilir ve 33 kalır.",
              en: "There is no rounding. 33.33 is truncated down to 33.",
            },
          },
          {
            text: { tr: "Hata verir", en: "It throws an error" },
            correct: false,
            feedback: {
              tr: "Hata vermez, işte tehlikesi de burada: kod çalışır, sonuç sessizce yanlış olur.",
              en: "No error, and that is exactly the danger: the code runs and quietly produces the wrong number.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "Tip, ne yapabileceğini belirler", en: "A type decides what you can do" },
      blocks: [
        {
          kind: "text",
          text: {
            tr: "Bir tip iki şeyi söyler: bellekte ne tutulduğunu ve o değerle hangi işlemlerin geçerli olduğunu. Oyun kodunda dört tanesi neredeyse her yerde karşına çıkar.",
            en: "A type says two things: what is held in memory and which operations are valid on that value. In game code four of them show up almost everywhere.",
          },
        },
        {
          kind: "table",
          head: [
            { tr: "Tip", en: "Type" },
            { tr: "Tutar", en: "Holds" },
            { tr: "Örnek", en: "Example" },
            { tr: "Unity'de nerede", en: "Where in Unity" },
          ],
          rows: [
            [
              { tr: "int", en: "int" },
              { tr: "Tam sayı", en: "Whole number" },
              { tr: "int score = 120;", en: "int score = 120;" },
              { tr: "Puan, can, sayaç", en: "Score, health, counters" },
            ],
            [
              { tr: "float", en: "float" },
              { tr: "Ondalıklı sayı", en: "Decimal number" },
              { tr: "float speed = 8.5f;", en: "float speed = 8.5f;" },
              { tr: "Hız, süre, mesafe", en: "Speed, time, distance" },
            ],
            [
              { tr: "bool", en: "bool" },
              { tr: "İki durum", en: "Two states" },
              { tr: "bool isAlive = true;", en: "bool isAlive = true;" },
              { tr: "Anahtarlar", en: "Switches" },
            ],
            [
              { tr: "string", en: "string" },
              { tr: "Metin", en: "Text" },
              { tr: "string name = \"Deniz\";", en: "string name = \"Deniz\";" },
              { tr: "İsim, etiket", en: "Names, labels" },
            ],
          ],
        },
        {
          kind: "text",
          text: {
            tr: "f eki şundan geliyor: C#'ta ondalıklı sabitler varsayılan olarak double sayılır. 8.5 bir double'dır ve double bir float'a kendiliğinden sığdırılmaz. 8.5f yazınca sabit doğrudan float olur.",
            en: "The f suffix exists because decimal literals in C# default to double. 8.5 is a double, and a double is not silently squeezed into a float. Writing 8.5f makes the literal a float from the start.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Peki neden float? Unity oyun kodunda float kullanır çünkü oyunlarda hassasiyetten çok hız gerekir. double iki kat yer kaplar ve mobil işlemcide daha yavaştır.",
            en: "Why float at all? Unity uses float in game code because games need speed more than precision. A double takes twice the space and is slower on a mobile processor.",
          },
        },
        {
          kind: "callout",
          tone: "warning",
          text: {
            tr: "Tamsayı bölmesi sessiz bir hatadır. 7 / 2 sonucu 3'tür. Ondalık istiyorsan taraflardan birini float yap: 7f / 2 sonucu 3.5f olur.",
            en: "Integer division fails silently. 7 / 2 is 3. If you want a fraction, make one side a float: 7f / 2 gives 3.5f.",
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
            tr: "Alanları doğru tiplerle tamamla.",
            en: "Complete the fields with the right types.",
          },
          template: `public ___ score = 120;
public ___ moveSpeed = 8.5___;
public ___ isAlive = true;
public ___ playerName = "Deniz";`,
          answers: ["int", "float", "f", "bool", "string"],
          distractors: ["double", "text", "number", "d"],
          feedback: {
            tr: "Ondalık sabitin sonundaki f olmadan 8.5 bir double olur ve float alana atanamaz.",
            en: "Without the trailing f, 8.5 is a double and cannot be assigned to a float field.",
          },
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Inspector'daki bir int alanına 12.7 yazdın. Alan ne değer alır?",
            en: "You typed 12.7 into an int field in the Inspector. What value does the field take?",
          },
          choices: [
            {
              text: { tr: "12", en: "12" },
              correct: true,
              feedback: {
                tr: "Doğru. Tip yalnızca kodu değil Inspector'ı da bağlar. int alan ondalık tutamaz, değer kesilir.",
                en: "Right. The type constrains the Inspector too, not just the code. An int field cannot hold a fraction, so the value is truncated.",
              },
            },
            {
              text: { tr: "13", en: "13" },
              correct: false,
              feedback: {
                tr: "Yuvarlama yapmaz, keser. 12.7 girilse de 12 kalır.",
                en: "It truncates rather than rounds. Even 12.7 ends up as 12.",
              },
            },
            {
              text: { tr: "12.7", en: "12.7" },
              correct: false,
              feedback: {
                tr: "int alan ondalık saklayamaz. Ondalık istiyorsan alanı float yapman gerekir.",
                en: "An int field cannot store a fraction. If you need one, the field has to be a float.",
              },
            },
          ],
        },
        {
          kind: "code",
          question: {
            tr: "Canın yarısını ondalık kaybetmeden hesapla ve Console'a yazdır.",
            en: "Compute half of health without losing the fraction and print it to the Console.",
          },
          starter: `using UnityEngine;

public class Stats : MonoBehaviour
{
    private int health = 75;

    private void Start()
    {
        // Canın yarısını float olarak hesapla ve yazdır
    }
}`,
          checks: [
            {
              pattern: "float\\s+\\w+\\s*=",
              expect: true,
              message: {
                tr: "Sonucu bir float değişkende tutuyorsun.",
                en: "You are holding the result in a float variable.",
              },
            },
            {
              pattern: "health\\s*/\\s*2\\s*[;)]",
              expect: false,
              message: {
                tr: "health / 2 tamsayı bölmesi yapar ve 37 verir. Bölenin sonuna f ekle: health / 2f.",
                en: "health / 2 is integer division and gives 37. Add f to the divisor: health / 2f.",
              },
            },
            {
              pattern: "health\\s*/\\s*2f|\\(\\s*float\\s*\\)\\s*health\\s*/\\s*2",
              expect: true,
              message: {
                tr: "Bölme float olarak yapılıyor, ondalık kısım korunuyor.",
                en: "The division happens in float, so the fraction survives.",
              },
            },
            {
              pattern: "Debug\\s*\\.\\s*Log\\s*\\(",
              expect: true,
              message: {
                tr: "Sonuç Console'a yazdırılıyor.",
                en: "The result is printed to the Console.",
              },
            },
          ],
          solvedMessage: {
            tr: "75 / 2f sonucu 37.5f. Aynı satırı 75 / 2 diye yazsaydın 37 görürdün ve hatayı fark etmen haftalar sürebilirdi.",
            en: "75 / 2f is 37.5f. Written as 75 / 2 you would have seen 37, and that kind of bug can hide for weeks.",
          },
        },
      ],
    },
    {
      kind: "summary",
      points: [
        {
          tr: "int tam sayı tutar; int bölü int sonucu da tam sayıdır.",
          en: "An int holds whole numbers, and an int divided by an int is still whole.",
        },
        {
          tr: "Ondalık sabitin sonuna f gelir, yoksa double olur.",
          en: "A decimal literal needs a trailing f, otherwise it is a double.",
        },
        {
          tr: "Tip, değerin ne olduğunu değil onunla ne yapabileceğini belirler.",
          en: "A type decides not what the value is but what you can do with it.",
        },
      ],
    },
  ],
};
