import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label:
            "Das Team prüfte Beispielfragen mit offenen Antworten (Archiv für mündliche Geschichte) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 30, lag über 22 und 24.",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Archiv für mündliche Geschichte: Beispielfragen mit offenen Antworten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label:
            "The team tested sample open questions for interviewers in the oral history archive and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 30, exceeded both 22 and 24.",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of sample open questions for interviewers: oral history archive",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji contoh pertanyaan terbuka bagi pewawancara pada arsip sejarah lisan dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 30, melampaui 22 dan 24.",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam arsip sejarah lisan: contoh pertanyaan terbuka bagi pewawancara",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
