import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte Volumenmarkierungen an jeder Tonne (gemeinschaftliche Regentonnen) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 32, lag über 23 und 25.",
        },
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext gemeinschaftliche Regentonnen: Volumenmarkierungen an jeder Tonne",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested volume markings on each barrel in the community rainwater barrels and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 32, exceeded both 23 and 25.",
        },
        {
          isCorrect: true,
          label:
            "A cautious trial of volume markings on each barrel: community rainwater barrels",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji garis ukur volume pada dinding penampung pada penampung air hujan warga dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 32, melampaui 23 dan 25.",
        },
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam dinding penampung pada penampung air hujan warga: garis ukur volume",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
