import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "bewirkte, dass der Ausgangswert sank",
        },
        {
          isCorrect: false,
          label: "ersetzte den Vergleichswert in der Berechnung",
        },
        {
          isCorrect: true,
          label: "hatte einen höheren Zahlenwert als",
        },
        {
          isCorrect: false,
          label: "lag außerhalb des messbaren Bereichs",
        },
        {
          isCorrect: false,
          label: "bewies die Änderung als einzige Ursache",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "caused the baseline to become lower",
        },
        {
          isCorrect: false,
          label: "replaced the comparison value in the calculation",
        },
        {
          isCorrect: true,
          label: "had a numerically higher value than",
        },
        {
          isCorrect: false,
          label: "lay outside the range that could be measured",
        },
        {
          isCorrect: false,
          label: "proved that the change was the only cause",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menyebabkan nilai awal menjadi lebih rendah",
        },
        {
          isCorrect: false,
          label: "menggantikan nilai pembanding dalam perhitungan",
        },
        {
          isCorrect: true,
          label: "memiliki nilai numerik yang lebih tinggi daripada",
        },
        {
          isCorrect: false,
          label: "berada di luar rentang yang boleh diukur",
        },
        {
          isCorrect: false,
          label: "membuktikan perubahan sebagai satu-satunya penyebab",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
