import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung, Richtungspfeile an jeder Kreuzung, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Richtungspfeile an jeder Kreuzung, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Richtungspfeile an jeder Kreuzung, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Richtungspfeile an jeder Kreuzung, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Richtungspfeile an jeder Abzweigung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change, direction arrows placed at each junction, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, direction arrows placed at each junction, introduced several differences that could not be separated.",
        },
        {
          isCorrect: false,
          label:
            "The change, direction arrows placed at each junction, explained why the comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The change, direction arrows placed at each junction, addressed the final outcome rather than the source of uncertainty.",
        },
        {
          isCorrect: true,
          label:
            "The change, direction arrows placed at each junction, directly addressed the observed uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan berupa panah arah di setiap persimpangan menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa panah arah di setiap persimpangan menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa panah arah di setiap persimpangan menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa panah arah di setiap persimpangan menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan berupa panah arah yang ditempatkan langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
