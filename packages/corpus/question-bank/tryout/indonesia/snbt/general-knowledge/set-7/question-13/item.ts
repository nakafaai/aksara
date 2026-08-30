import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Beispielfragen mit offenen Antworten (Archiv für mündliche Geschichte) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Archiv für mündliche Geschichte: Beispielfragen mit offenen Antworten",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 30, lag über 22 und 24.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: true,
          label:
            "The team tested sample open questions for interviewers in the oral history archive and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of sample open questions for interviewers: oral history archive",
        },
        {
          isCorrect: false,
          label: "The intervention value, 30, exceeded both 22 and 24.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji contoh pertanyaan terbuka bagi pewawancara pada arsip sejarah lisan dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam arsip sejarah lisan: contoh pertanyaan terbuka bagi pewawancara",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 30, melampaui 22 dan 24.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
