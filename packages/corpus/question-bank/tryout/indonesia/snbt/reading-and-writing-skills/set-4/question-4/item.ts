import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung, Fotobeschriftungen an den Rückgaberegalen, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Fotobeschriftungen an den Rückgaberegalen, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Fotobeschriftungen an den Rückgaberegalen, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Fotobeschriftungen an den Rückgaberegalen, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Fotoetiketten an den Rückgaberegalen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change, photo labels on the return shelves, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, photo labels on the return shelves, introduced several differences that could not be separated.",
        },
        {
          isCorrect: false,
          label:
            "The change, photo labels on the return shelves, explained why the comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The change, photo labels on the return shelves, addressed the final outcome rather than the source of uncertainty.",
        },
        {
          isCorrect: true,
          label:
            "The change, photo labels on the return shelves, directly addressed the observed uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan berupa label foto pada rak pengembalian menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label foto pada rak pengembalian menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label foto pada rak pengembalian menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label foto pada rak pengembalian menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan berupa label foto langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
