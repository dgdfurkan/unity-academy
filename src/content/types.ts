/**
 * Ders içeriğinin biçimi. Metinler iki dilde yan yana duruyor: parite
 * yapının kendisinden geliyor, bir dilde eksik bırakmak derlemeyi kırıyor.
 */
import type { Locale } from "@/i18n/config";

/** İki dilli metin. */
export type L = Record<Locale, string>;

export type Choice = {
  text: L;
  correct: boolean;
  /** Seçilince çıkan açıklama. Doğru için de yazılır, "neden doğru" anlatır. */
  feedback: L;
};

export type Exercise =
  | {
      kind: "choice";
      /** Birden çok doğru şık varsa true. */
      multi: boolean;
      question: L;
      choices: Choice[];
    }
  | {
      kind: "match";
      question: L;
      pairs: { left: L; right: L }[];
    }
  | {
      kind: "spot";
      question: L;
      /** Kod satırları. Öğrenci hatalı olanı tıklar. */
      lines: string[];
      correctLine: number;
      feedback: L;
    }
  | {
      kind: "fill";
      question: L;
      /** `___` geçen her yer bir boşluk. Sıra, `answers` ile aynı. */
      template: string;
      answers: string[];
      /** Havuzda görünecek yanlış seçenekler. */
      distractors: string[];
      feedback: L;
    }
  | {
      kind: "order";
      question: L;
      /** Doğru sıradaki öğeler. Ekranda karıştırılmış gelir. */
      items: L[];
      feedback: L;
    }
  | {
      kind: "inspector";
      question: L;
      /** Solda görünen kod. */
      code: string;
      /** Inspector'da düzenlenebilir alanlar. */
      fields: { name: string; type: "float" | "int" | "bool"; value: string }[];
      /** Öğrencinin ulaşması gereken durum. */
      target: { name: string; value: string };
      feedback: L;
    }
  | {
      kind: "code";
      question: L;
      /** Editörde hazır duran başlangıç kodu. */
      starter: string;
      /**
       * Yapısal kontroller. Gerçek bir C# derleyicisi çalıştırmıyoruz;
       * dersin öğrettiği özelliklerin kodda olup olmadığına bakıyoruz.
       * Her kontrolün kendi hata mesajı var, genel bir "yanlış" yok.
       */
      checks: { pattern: string; flags?: string; expect: boolean; message: L }[];
      solvedMessage: L;
    };

export type TeachBlock =
  | { kind: "text"; text: L }
  | { kind: "list"; items: L[] }
  | { kind: "table"; head: L[]; rows: L[][] }
  | { kind: "code"; code: string; caption?: L }
  | { kind: "callout"; tone: "info" | "warning"; text: L };

export type Step =
  | { kind: "hook"; title: L; body: L }
  | { kind: "predict"; exercise: Exercise }
  | { kind: "teach"; title: L; blocks: TeachBlock[] }
  | { kind: "check"; exercises: Exercise[] }
  | { kind: "summary"; points: L[] };

export type Lesson = {
  /** `m1-l1` biçiminde; `lessonId()` ile aynı. */
  id: string;
  moduleIndex: number;
  lessonIndex: number;
  minutes: number;
  /** Aralıklı tekrar kuyruğuna girecek kavramlar. */
  concepts: string[];
  steps: Step[];
};
