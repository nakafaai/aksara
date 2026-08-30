import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team prüfte Volumenmarkierungen an jeder Tonne (gemeinschaftliche Regentonnen) und bewertete die Befunde vorsichtig.",
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
            "Vorsichtige Prüfung im Kontext gemeinschaftliche Regentonnen: Volumenmarkierungen an jeder Tonne",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 32, lag über 23 und 25.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team tested volume markings on each barrel in the community rainwater barrels and interpreted the evidence cautiously.",
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
            "A cautious trial of volume markings on each barrel: community rainwater barrels",
        },
        {
          isCorrect: false,
          label: "The intervention value, 32, exceeded both 23 and 25.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim menguji garis ukur volume pada dinding penampung pada penampung air hujan warga dan menafsirkan buktinya secara hati-hati.",
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
            "Uji Hati-hati dalam dinding penampung pada penampung air hujan warga: garis ukur volume",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 32, melampaui 23 dan 25.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
