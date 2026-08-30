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
            "Das Team prüfte bebilderte Hinweise neben dem Wasserhahn (Wasser-Nachfüllstation) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Wasser-Nachfüllstation: bebilderte Hinweise neben dem Wasserhahn",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 29, lag über 21 und 23.",
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
            "The team tested illustrated instructions beside the tap in the water refill station and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of illustrated instructions beside the tap: water refill station",
        },
        {
          isCorrect: false,
          label: "The intervention value, 29, exceeded both 21 and 23.",
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
            "Tim menguji petunjuk bergambar di dekat keran pada stasiun isi ulang air dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam stasiun isi ulang air: petunjuk bergambar di dekat keran",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 29, melampaui 21 dan 23.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
