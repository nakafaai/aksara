import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung, Fragekarten an jedem Demonstrationstisch, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Fragekarten an jedem Demonstrationstisch, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Fragekarten an jedem Demonstrationstisch.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Fragekarten an jedem Demonstrationstisch, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Fragekarten an jedem Demonstrationstisch, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change, question cards at each demonstration table, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, question cards at each demonstration table, introduced several differences that could not be separated.",
        },
        {
          isCorrect: true,
          label:
            "The change, question cards at each demonstration table, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, question cards at each demonstration table, explained why the comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The change, question cards at each demonstration table, addressed the final outcome rather than the source of uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan berupa kartu pertanyaan di setiap meja demonstrasi menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa kartu pertanyaan di setiap meja demonstrasi menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan berupa kartu pertanyaan untuk setiap meja demonstrasi langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa kartu pertanyaan di setiap meja demonstrasi menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa kartu pertanyaan di setiap meja demonstrasi menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
