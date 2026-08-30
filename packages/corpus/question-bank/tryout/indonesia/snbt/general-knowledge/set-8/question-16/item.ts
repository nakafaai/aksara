import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Besucher, die ohne Suche einen Platz fanden und kurze Aussagen von Nutzenden",
        },
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 34, lag über 24 und 26.",
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
            "Vorsichtige Prüfung im Kontext ruhige Lernzone: eine Anzeige freier Plätze an der Tür",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "visitors finding a seat without circling the room and short comments from users",
        },
        {
          isCorrect: true,
          label: "The intervention value, 34, exceeded both 24 and 26.",
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
            "A cautious trial of a seat-availability board at the door: quiet study zone",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "pengunjung yang menemukan kursi tanpa berkeliling dan komentar singkat pengguna",
        },
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 34, melampaui 24 dan 26.",
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
            "Uji Hati-hati dalam zona belajar tenang: papan ketersediaan kursi di pintu",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
