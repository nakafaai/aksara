import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung, nach Rezeptschritten gruppierte Zutaten, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, nach Rezeptschritten gruppierte Zutaten, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, nach Rezeptschritten gruppierte Zutaten, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: nach Rezeptschritten geordnete Zutaten.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, nach Rezeptschritten gruppierte Zutaten, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change, ingredients grouped by recipe stage, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, ingredients grouped by recipe stage, introduced several differences that could not be separated.",
        },
        {
          isCorrect: false,
          label:
            "The change, ingredients grouped by recipe stage, explained why the comparison values were identical.",
        },
        {
          isCorrect: true,
          label:
            "The change, ingredients grouped by recipe stage, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, ingredients grouped by recipe stage, addressed the final outcome rather than the source of uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan berupa bahan yang dikelompokkan menurut tahap resep menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa bahan yang dikelompokkan menurut tahap resep menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa bahan yang dikelompokkan menurut tahap resep menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan berupa bahan yang dikelompokkan menurut tahap resep langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa bahan yang dikelompokkan menurut tahap resep menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
