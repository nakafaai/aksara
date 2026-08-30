import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "vollständig abgespielte Aufnahmen und kurze Aussagen von Nutzenden",
        },
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 31, lag über 21 und 23.",
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
            "Vorsichtige Prüfung im Kontext Audioführung im Museum: kurze Codes auf Augenhöhe",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "recordings played to completion and short comments from users",
        },
        {
          isCorrect: true,
          label: "The intervention value, 31, exceeded both 21 and 23.",
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
            "A cautious trial of short codes printed at eye level: museum audio guide",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "rekaman yang dibuka sampai selesai dan komentar singkat pengguna",
        },
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 21 dan 23.",
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
            "Uji Hati-hati dalam panduan audio museum: kode singkat yang dicetak setinggi mata",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
