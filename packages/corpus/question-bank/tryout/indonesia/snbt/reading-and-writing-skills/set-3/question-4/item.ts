import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: kontrastreichere Symbole für Sammelpunkte.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, kontrastreichere Sammelplatzsymbole, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, kontrastreichere Sammelplatzsymbole, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, kontrastreichere Sammelplatzsymbole, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, kontrastreichere Sammelplatzsymbole, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The change, higher-contrast assembly-point symbols, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, higher-contrast assembly-point symbols, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, higher-contrast assembly-point symbols, introduced several differences that could not be separated.",
        },
        {
          isCorrect: false,
          label:
            "The change, higher-contrast assembly-point symbols, explained why the comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The change, higher-contrast assembly-point symbols, addressed the final outcome rather than the source of uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Perubahan berupa simbol titik kumpul yang lebih kontras langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa simbol titik kumpul dengan kontras lebih tinggi menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa simbol titik kumpul dengan kontras lebih tinggi menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa simbol titik kumpul dengan kontras lebih tinggi menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa simbol titik kumpul dengan kontras lebih tinggi menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
