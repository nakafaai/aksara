import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "nachgefüllte Flaschen und kurze Aussagen von Nutzenden",
        },
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 29, lag über 21 und 23.",
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
            "Vorsichtige Prüfung im Kontext Wasser-Nachfüllstation: bebilderte Hinweise neben dem Wasserhahn",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "bottles refilled and short comments from users",
        },
        {
          isCorrect: true,
          label: "The intervention value, 29, exceeded both 21 and 23.",
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
            "A cautious trial of illustrated instructions beside the tap: water refill station",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "botol yang diisi ulang dan komentar singkat pengguna",
        },
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 29, melampaui 21 dan 23.",
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
            "Uji Hati-hati dalam stasiun isi ulang air: petunjuk bergambar di dekat keran",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
