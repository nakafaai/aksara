import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 29, lag über 20 und 22.",
        },
        {
          isCorrect: false,
          label:
            "richtig zugeordnete Gegenstände und kurze Aussagen von Nutzenden",
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
            "Vorsichtige Prüfung im Kontext Sortierung von Küstenabfällen: Beispielgegenstände an jedem Behälter",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The intervention value, 29, exceeded both 20 and 22.",
        },
        {
          isCorrect: false,
          label:
            "items placed in the correct category and short comments from users",
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
            "A cautious trial of sample objects displayed on each container: coastal litter sorting",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 29, melampaui 20 dan 22.",
        },
        {
          isCorrect: false,
          label:
            "benda yang masuk ke kategori yang tepat dan komentar singkat pengguna",
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
            "Uji Hati-hati dalam setiap wadah pada pemilahan sampah pesisir: contoh benda",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
