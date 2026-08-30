import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tabletts ohne Speisereste und kurze Aussagen von Nutzenden",
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
            "Vorsichtige Prüfung im Kontext Kantine zur Verringerung von Speiseresten: die Wahl zwischen kleinen und normalen Portionen",
        },
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 26, lag über 18 und 20.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "trays returned without leftovers and short comments from users",
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
            "A cautious trial of a choice between small and regular portions: food-waste reduction canteen",
        },
        {
          isCorrect: true,
          label: "The intervention value, 26, exceeded both 18 and 20.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "nampan yang kembali tanpa sisa dan komentar singkat pengguna",
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
            "Uji Hati-hati dalam kantin bebas sisa makanan: pilihan porsi kecil dan porsi biasa",
        },
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 26, melampaui 18 dan 20.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
