import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 31, lag über 24 und 26.",
        },
        {
          isCorrect: false,
          label:
            "Lesesitzungen von mehr als dreißig Minuten und kurze Aussagen von Nutzenden",
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
            "Vorsichtige Prüfung im Kontext abendlicher Leseraum: ausleihbare Schreibtischlampen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The intervention value, 31, exceeded both 24 and 26.",
        },
        {
          isCorrect: false,
          label:
            "reading sessions lasting more than thirty minutes and short comments from users",
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
            "A cautious trial of desk lamps that visitors could borrow: evening reading room",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 24 dan 26.",
        },
        {
          isCorrect: false,
          label:
            "sesi membaca yang bertahan lebih dari tiga puluh menit dan komentar singkat pengguna",
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
            "Uji Hati-hati dalam ruang baca malam: lampu meja yang dapat dipinjam",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
