import type { Lesson } from "@/content/types";

/** Ders 06 — public, private ve [SerializeField] */
export const m2l3: Lesson = {
  id: "m2-l3",
  moduleIndex: 1,
  lessonIndex: 2,
  minutes: 20,
  concepts: ["access-modifiers", "serialization", "inspector-overrides-code"],
  steps: [
    {
      kind: "hook",
      title: { tr: "Üçüncüsü ilkiyle aynı görünüyor", en: "The third one looks just like the first" },
      body: {
        tr: "public float speed Inspector'da görünüyor. private float speed görünmüyor. [SerializeField] private float speed ise yine görünüyor. Üçüncüsü gözle birinciden ayırt edilemiyor. Peki aralarındaki fark ne?",
        en: "public float speed shows up in the Inspector. private float speed does not. [SerializeField] private float speed shows up again. The third is indistinguishable from the first by eye. So what actually differs?",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: true,
        question: {
          tr: "[SerializeField] private float speed; alanı için hangileri doğru?",
          en: "For the field [SerializeField] private float speed; which of these are true?",
        },
        choices: [
          {
            text: { tr: "Inspector'da görünür", en: "It shows up in the Inspector" },
            correct: true,
            feedback: {
              tr: "Doğru. SerializeField, Unity'ye bu alanı kaydetmesini ve göstermesini söyler.",
              en: "Right. SerializeField tells Unity to store this field and to show it.",
            },
          },
          {
            text: { tr: "Unity değeri sahne dosyasına kaydeder", en: "Unity stores the value in the scene file" },
            correct: true,
            feedback: {
              tr: "Doğru. Serileştirmenin asıl anlamı bu: değer sahneyle birlikte diske yazılır.",
              en: "Right. That is what serialisation means: the value is written to disk along with the scene.",
            },
          },
          {
            text: { tr: "Başka bir script'ten other.speed ile okunabilir", en: "Another script can read it as other.speed" },
            correct: false,
            feedback: {
              tr: "Okunamaz. Alan hâlâ private; SerializeField erişim belirleyicisini değiştirmez, yalnızca serileştirmeyi açar.",
              en: "It cannot. The field is still private; SerializeField does not change the access modifier, it only turns serialisation on.",
            },
          },
          {
            text: { tr: "public ile tamamen aynı şeydir", en: "It is exactly the same as public" },
            correct: false,
            feedback: {
              tr: "Aynı değil. İkisi de Inspector'da görünür ama public alan koda da açıktır. Farkın tamamı burada.",
              en: "Not the same. Both appear in the Inspector, but a public field is also open to code. That is the whole difference.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "İki ayrı soru, iki ayrı cevap", en: "Two separate questions, two separate answers" },
      blocks: [
        {
          kind: "text",
          text: {
            tr: "Kafa karışıklığının kaynağı şu: burada iki ayrı soru var ve çoğu kişi bunları tek soru sanıyor. Birincisi, bu alana başka kod erişebilir mi? İkincisi, Unity bu alanı kaydedip Inspector'da gösterir mi? Biri C#'a ait, diğeri Unity'ye.",
            en: "The confusion comes from this: there are two separate questions here and most people treat them as one. First, can other code reach this field? Second, does Unity store it and show it in the Inspector? One belongs to C#, the other to Unity.",
          },
        },
        {
          kind: "table",
          head: [
            { tr: "Yazım", en: "Declaration" },
            { tr: "Koddan erişim", en: "Access from code" },
            { tr: "Inspector", en: "Inspector" },
          ],
          rows: [
            [
              { tr: "public float speed", en: "public float speed" },
              { tr: "Her yerden", en: "From anywhere" },
              { tr: "Görünür", en: "Visible" },
            ],
            [
              { tr: "private float speed", en: "private float speed" },
              { tr: "Yalnızca kendi class'ı", en: "Its own class only" },
              { tr: "Görünmez", en: "Hidden" },
            ],
            [
              { tr: "[SerializeField] private float speed", en: "[SerializeField] private float speed" },
              { tr: "Yalnızca kendi class'ı", en: "Its own class only" },
              { tr: "Görünür", en: "Visible" },
            ],
            [
              { tr: "[HideInInspector] public float speed", en: "[HideInInspector] public float speed" },
              { tr: "Her yerden", en: "From anywhere" },
              { tr: "Görünmez", en: "Hidden" },
            ],
          ],
        },
        {
          kind: "text",
          text: {
            tr: "Varsayılan seçim [SerializeField] private olmalı. Tasarımcı Inspector'dan ayarlar, kod dışarıya kapalı kalır. public her ikisini birden açtığı için kötü bir varsayılandır: dışarıya açılan her alan, ileride birinin bozabileceği bir yüzeydir.",
            en: "The default choice should be [SerializeField] private. A designer tunes it in the Inspector while the code stays closed. public opens both at once, which makes it a poor default: every field you expose is a surface someone can break later.",
          },
        },
        {
          kind: "callout",
          tone: "warning",
          text: {
            tr: "En kritik davranış: Inspector'daki değer koddaki başlangıç değerini ezer. Kodda 8f yazıp Inspector'da 3 görüyorsan, sahnede kayıtlı olan 3'tür. Kodu değiştirmek o nesnenin değerini değiştirmez; bileşeni Reset etmen gerekir.",
            en: "The critical behaviour: the value in the Inspector overrides the initial value in the code. If the code says 8f and the Inspector shows 3, then 3 is what the scene stored. Changing the code does not change that object's value; you have to Reset the component.",
          },
        },
      ],
    },
    {
      kind: "check",
      exercises: [
        {
          kind: "inspector",
          question: {
            tr: "Kodda speed 10f yazıyor ama sahnede başka bir değer kayıtlı. Inspector'daki speed değerini 4 yap ve Play'e bas.",
            en: "The code says speed is 10f, but the scene stored something else. Set speed to 4 in the Inspector and press Play.",
          },
          code: `public class Mover : MonoBehaviour
{
    [SerializeField]
    private float speed = 10f;

    [SerializeField]
    private bool canMove = true;

    private void Start()
    {
        Debug.Log(speed);
    }
}`,
          fields: [
            { name: "speed", type: "float", value: "7" },
            { name: "canMove", type: "bool", value: "true" },
          ],
          target: { name: "speed", value: "4" },
          feedback: {
            tr: "Kodda 10f yazmasına rağmen Console 4 yazdı. Sahnede kayıtlı olan değer kazanır. Kodu değiştirmek bu nesneyi etkilemez; bileşenin sağ üstündeki menüden Reset demen gerekir.",
            en: "The code says 10f yet the Console printed 4. The value stored in the scene wins. Changing the code does not touch this object; you have to Reset the component from its context menu.",
          },
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "private float speed alanını Inspector'da arıyorsun ama yok. Neden?",
            en: "You are looking for a private float speed field in the Inspector and it is not there. Why?",
          },
          choices: [
            {
              text: { tr: "Serileşmiyor, Unity onu kaydetmiyor", en: "It is not serialised, so Unity does not store it" },
              correct: true,
              feedback: {
                tr: "Doğru. Görünürlük serileştirmeye bağlı. Görünmesini istiyorsan [SerializeField] ekle, public yapma.",
                en: "Right. Visibility follows serialisation. If you want it shown, add [SerializeField] rather than making it public.",
              },
            },
            {
              text: { tr: "private alanlar Unity'de kullanılamaz", en: "private fields cannot be used in Unity" },
              correct: false,
              feedback: {
                tr: "Kullanılır. Çalışma anında hesaplanan değerlerin çoğu zaten private olmalı.",
                en: "They can. Most values computed at runtime should be private anyway.",
              },
            },
            {
              text: { tr: "Inspector yalnızca float göstermez", en: "The Inspector does not show floats" },
              correct: false,
              feedback: {
                tr: "Gösterir. Sorun tipte değil, alanın serileşmemesinde.",
                en: "It does. The issue is not the type but the fact that the field is not serialised.",
              },
            },
          ],
        },
        {
          kind: "match",
          question: {
            tr: "Her durumu doğru yazımla eşleştir",
            en: "Match each situation to the right declaration",
          },
          pairs: [
            {
              left: { tr: "Tasarımcı ayarlayacak, kod dışarı açılmasın", en: "A designer tunes it, code stays closed" },
              right: { tr: "[SerializeField] private", en: "[SerializeField] private" },
            },
            {
              left: { tr: "Çalışma anında hesaplanıyor, kaydedilmesin", en: "Computed at runtime, should not be stored" },
              right: { tr: "private", en: "private" },
            },
            {
              left: { tr: "Başka script okuyacak ama Inspector'ı kirletmesin", en: "Another script reads it, but keep the Inspector clean" },
              right: { tr: "[HideInInspector] public", en: "[HideInInspector] public" },
            },
          ],
        },
        {
          kind: "code",
          question: {
            tr: "jumpForce alanını Inspector'da göster ama başka script'lerden erişilemez yap.",
            en: "Expose a jumpForce field in the Inspector but keep it unreachable from other scripts.",
          },
          starter: `using UnityEngine;

public class Jumper : MonoBehaviour
{
    // jumpForce alanını buraya yaz
}`,
          checks: [
            {
              pattern: "\\[\\s*SerializeField\\s*\\]",
              expect: true,
              message: {
                tr: "[SerializeField] eklenmiş, alan Inspector'da görünecek.",
                en: "[SerializeField] is present, so the field will appear in the Inspector.",
              },
            },
            {
              pattern: "private\\s+float\\s+jumpForce",
              expect: true,
              message: {
                tr: "Alan private float jumpForce olarak tanımlanmış.",
                en: "The field is declared as private float jumpForce.",
              },
            },
            {
              pattern: "public\\s+float\\s+jumpForce",
              expect: false,
              message: {
                tr: "Alanı public yapmışsın. O zaman Inspector'da görünür ama dışarıya da açılır; istenen bu değildi.",
                en: "You made the field public. It shows in the Inspector but it is also open to the outside, which is not what was asked.",
              },
            },
          ],
          solvedMessage: {
            tr: "Bu, Unity kodunda alan tanımlamanın varsayılan biçimi. public yazmak istediğinde önce şunu sor: bu alanı gerçekten başka bir script okuyacak mı?",
            en: "This is the default way to declare a field in Unity code. Whenever you reach for public, ask first: is another script really going to read this?",
          },
        },
      ],
    },
    {
      kind: "summary",
      points: [
        {
          tr: "Erişim belirleyici kodu, serileştirme Inspector'ı ilgilendirir.",
          en: "The access modifier concerns code; serialisation concerns the Inspector.",
        },
        {
          tr: "Varsayılan [SerializeField] private'dır; public istisnadır.",
          en: "The default is [SerializeField] private; public is the exception.",
        },
        {
          tr: "Inspector'daki değer koddaki başlangıç değerini ezer.",
          en: "The value in the Inspector overrides the initial value in the code.",
        },
      ],
    },
  ],
};
