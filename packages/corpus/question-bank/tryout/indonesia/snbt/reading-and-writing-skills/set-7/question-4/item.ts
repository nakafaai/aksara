import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung, Menüvorbestellung am Vortag, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Menüvorbestellung am Vortag, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Menübestellung am Vortag.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Menüvorbestellung am Vortag, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Menüvorbestellung am Vortag, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change, menu booking one day in advance, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, menu booking one day in advance, introduced several differences that could not be separated.",
        },
        {
          isCorrect: true,
          label:
            "The change, menu booking one day in advance, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, menu booking one day in advance, explained why the comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The change, menu booking one day in advance, addressed the final outcome rather than the source of uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan berupa pemesanan menu sehari sebelumnya menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa pemesanan menu sehari sebelumnya menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan berupa pemesanan menu sehari sebelumnya langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa pemesanan menu sehari sebelumnya menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa pemesanan menu sehari sebelumnya menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
