import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Interviews mit vollständigem Kontext und kurze Aussagen von Nutzenden",
        },
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
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Archiv für mündliche Geschichte: Beispielfragen mit offenen Antworten",
        },
        {
          isCorrect: true,
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
            "interviews with complete context and short comments from users",
        },
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
          isCorrect: false,
          label:
            "A cautious trial of sample open questions for interviewers: oral history archive",
        },
        {
          isCorrect: true,
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
            "wawancara dengan konteks yang lengkap dan komentar singkat pengguna",
        },
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
          isCorrect: false,
          label:
            "Uji Hati-hati dalam arsip sejarah lisan: contoh pertanyaan terbuka bagi pewawancara",
        },
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 30, melampaui 22 dan 24.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
