import type { Lesson } from "@/content/types";

/** Ders 04 — C# Nedir, Unity Onu Nasıl Çalıştırır? */
export const m2l1: Lesson = {
  id: "m2-l1",
  moduleIndex: 1,
  lessonIndex: 0,
  minutes: 14,
  concepts: ["class-basics", "using-directive", "unity-calls-you"],
  steps: [
    {
      kind: "hook",
      title: { tr: "Main nerede?", en: "Where is Main?" },
      body: {
        tr: "Yeni bir C# script'i açıyorsun. İçinde Main yok. Programlar Main ile başlar diye öğrenmiştin. Peki bu kod nasıl çalışıyor?",
        en: "You create a new C# script. There is no Main in it. You were taught that programs start at Main. So how does this code run at all?",
      },
    },
    {
      kind: "predict",
      exercise: {
        kind: "choice",
        multi: false,
        question: {
          tr: "Aşağıdaki script hiçbir GameObject'e eklenmedi. Play'e basınca ne olur?",
          en: "The script below was never added to a GameObject. What happens when you press Play?",
        },
        choices: [
          {
            text: { tr: "Hiçbir şey olmaz, Console boş kalır", en: "Nothing happens, the Console stays empty" },
            correct: true,
            feedback: {
              tr: "Doğru. Bir script yalnızca bir GameObject'e bileşen olarak eklendiğinde çalışır. Dosyanın projede durması yetmez.",
              en: "Right. A script only runs once it is attached to a GameObject as a component. Having the file in the project is not enough.",
            },
          },
          {
            text: { tr: "Console'a Merhaba yazar", en: "It prints Merhaba to the Console" },
            correct: false,
            feedback: {
              tr: "Yazmaz. Unity script'i kendiliğinden çalıştırmaz; önce bir nesneye bağlanması gerekir.",
              en: "It does not. Unity does not run a script by itself; it has to be attached to an object first.",
            },
          },
          {
            text: { tr: "Hata verir", en: "It throws an error" },
            correct: false,
            feedback: {
              tr: "Hata da vermez. Unity için bu sadece kullanılmayan bir sınıf; sessizce durur.",
              en: "No error either. To Unity this is just an unused class; it sits there quietly.",
            },
          },
          {
            text: { tr: "Unity script'i otomatik ekler", en: "Unity attaches it automatically" },
            correct: false,
            feedback: {
              tr: "Eklemez. Hangi script'in hangi nesnede olacağına sen karar verirsin.",
              en: "It does not. Which script goes on which object is your decision.",
            },
          },
        ],
      },
    },
    {
      kind: "teach",
      title: { tr: "Sen motoru değil, motor seni çağırır", en: "You do not call the engine; the engine calls you" },
      blocks: [
        {
          kind: "text",
          text: {
            tr: "Bir Unity script'i aslında bir class. İçinde alanlar ve metotlar var. Dosya adı ile class adı aynı olmak zorunda, yoksa Unity o script'i bir nesneye ekleyemez.",
            en: "A Unity script is really just a class with fields and methods inside it. The file name and the class name have to match, otherwise Unity cannot attach the script to an object.",
          },
        },
        {
          kind: "text",
          text: {
            tr: "Main olmamasının sebebi şu: kontrolü sen elinde tutmuyorsun. Unity, Start ve Update gibi belirli isimleri tanıyor ve zamanı gelince onları kendisi çağırıyor. Sen yalnızca o metotları doldurursun.",
            en: "The reason there is no Main: you are not the one holding control. Unity recognises specific names such as Start and Update and calls them itself at the right time. You only fill those methods in.",
          },
        },
        {
          kind: "code",
          code: `using UnityEngine;

public class Greeter : MonoBehaviour
{
    private void Start()
    {
        Debug.Log("İlk script çalıştı");
    }
}`,
          caption: {
            tr: "Greeter.cs dosyasında duruyor, adı class adıyla aynı.",
            en: "This lives in Greeter.cs, matching the class name.",
          },
        },
        {
          kind: "list",
          items: [
            {
              tr: "using UnityEngine; satırı Debug, Vector3, GameObject gibi isimleri getirir. Silersen hiçbiri bulunamaz.",
              en: "The using UnityEngine; line brings in names such as Debug, Vector3 and GameObject. Remove it and none of them resolve.",
            },
            {
              tr: ": MonoBehaviour mirası, script'in bir GameObject'e bileşen olarak eklenebilmesini sağlar.",
              en: "Inheriting from MonoBehaviour is what lets the script be attached to a GameObject as a component.",
            },
            {
              tr: "Start metodu private olabilir. Unity metotları isimle arar, erişim belirleyicisine bakmaz.",
              en: "Start can be private. Unity looks these methods up by name, not by access modifier.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "info",
          text: {
            tr: "MonoBehaviour'dan türemeyen bir class da yazabilirsin. Öyle bir class sahneye eklenemez ama saf veri ve yardımcı işler için tam olarak istenen şeydir.",
            en: "You can write a class that does not inherit from MonoBehaviour. Such a class cannot be attached to a scene, but for plain data and helpers that is exactly what you want.",
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
            tr: "Eksik satırı tamamla: Unity isimlerini getiren satır hangisi?",
            en: "Complete the missing line: which line brings in the Unity names?",
          },
          template: `___

public class Greeter : ___
{
    private void Start()
    {
        ___.Log("Merhaba");
    }
}`,
          answers: ["using UnityEngine;", "MonoBehaviour", "Debug"],
          distractors: ["using System;", "GameObject", "Console", "Component"],
          feedback: {
            tr: "using UnityEngine; olmadan Debug bulunamaz. MonoBehaviour mirası da script'i sahneye eklenebilir yapan şeydir.",
            en: "Without using UnityEngine; the name Debug cannot be found. The MonoBehaviour inheritance is what makes the script attachable to a scene.",
          },
        },
        {
          kind: "spot",
          question: {
            tr: "Dosyanın adı Player.cs. Hangi satır Unity'nin bu script'i eklemesini engelliyor?",
            en: "The file is named Player.cs. Which line stops Unity from attaching this script?",
          },
          lines: [
            "using UnityEngine;",
            "",
            "public class PlayerController : MonoBehaviour",
            "{",
            "    private void Start()",
            "    {",
            "        Debug.Log(\"hazır\");",
            "    }",
            "}",
          ],
          correctLine: 2,
          feedback: {
            tr: "class adı PlayerController ama dosya adı Player.cs. İkisi aynı olmadığı sürece Unity bileşeni ekleyemez.",
            en: "The class is PlayerController but the file is Player.cs. Until those two match, Unity cannot add the component.",
          },
        },
        {
          kind: "choice",
          multi: false,
          question: {
            tr: "Start metodunu private yerine public yaptın. Unity açısından ne değişir?",
            en: "You changed Start from private to public. What changes as far as Unity is concerned?",
          },
          choices: [
            {
              text: { tr: "Hiçbir şey", en: "Nothing" },
              correct: true,
              feedback: {
                tr: "Doğru. Unity bu metotları isimle bulur. private bırakmak daha iyidir: dışarıya gereksiz yüzey açmazsın.",
                en: "Right. Unity finds these methods by name. Leaving them private is better: you avoid exposing surface you do not need to.",
              },
            },
            {
              text: { tr: "Artık çalışır, önce çalışmıyordu", en: "It runs now; it did not before" },
              correct: false,
              feedback: {
                tr: "private Start da çalışır. Unity erişim belirleyicisine bakmadan isimle çağırır.",
                en: "A private Start runs just fine. Unity calls it by name without looking at the access modifier.",
              },
            },
            {
              text: { tr: "İki kez çalışır", en: "It runs twice" },
              correct: false,
              feedback: {
                tr: "Bir kez çalışır. Erişim belirleyici çağrı sayısını değiştirmez.",
                en: "It runs once. The access modifier does not change how many times it is called.",
              },
            },
          ],
        },
        {
          kind: "code",
          question: {
            tr: "Awake metodu içinde kendi adını Console'a yazdır.",
            en: "Inside an Awake method, print your own name to the Console.",
          },
          starter: `using UnityEngine;

public class Intro : MonoBehaviour
{
    // Awake metodunu buraya yaz
}`,
          checks: [
            {
              pattern: "using\\s+UnityEngine\\s*;",
              expect: true,
              message: {
                tr: "using UnityEngine; satırı duruyor.",
                en: "The using UnityEngine; line is there.",
              },
            },
            {
              pattern: "void\\s+Awake\\s*\\(\\s*\\)",
              expect: true,
              message: {
                tr: "Awake metodu tanımlanmış.",
                en: "An Awake method is defined.",
              },
            },
            {
              pattern: "Debug\\s*\\.\\s*Log\\s*\\(\\s*\"[^\"]+\"",
              expect: true,
              message: {
                tr: "Debug.Log içinde boş olmayan bir metin var.",
                en: "Debug.Log is called with a non-empty string.",
              },
            },
          ],
          solvedMessage: {
            tr: "Script bir nesneye eklendiğinde Awake, Start'tan da önce çalışır. Bir sonraki derste sırayı göreceksin.",
            en: "Once this script is on an object, Awake runs even before Start. You will see the ordering in the next lesson.",
          },
        },
      ],
    },
    {
      kind: "summary",
      points: [
        {
          tr: "Script bir class; dosya adı ile aynı adı taşır.",
          en: "A script is a class, and it carries the same name as its file.",
        },
        {
          tr: "Sen motoru değil, motor seni çağırır.",
          en: "You do not call the engine; the engine calls you.",
        },
        {
          tr: "using UnityEngine; olmadan Unity isimleri bulunamaz.",
          en: "Without using UnityEngine; the Unity names cannot be found.",
        },
      ],
    },
  ],
};
