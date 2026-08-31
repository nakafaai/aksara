import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung, Beispielfotos für jede Zustandskategorie, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Beispielfotos für jede Zustandskategorie.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Beispielfotos für jede Zustandskategorie, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Beispielfotos für jede Zustandskategorie, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Beispielfotos für jede Zustandskategorie, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change, sample photos for each condition category, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: true,
          label:
            "The change, sample photos for each condition category, directly addressed the observed uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, sample photos for each condition category, introduced several differences that could not be separated.",
        },
        {
          isCorrect: false,
          label:
            "The change, sample photos for each condition category, explained why the comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The change, sample photos for each condition category, addressed the final outcome rather than the source of uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan berupa foto contoh untuk setiap kategori kondisi menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan berupa contoh foto untuk setiap kategori kondisi langsung menanggapi keraguan yang diamati.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa foto contoh untuk setiap kategori kondisi menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa foto contoh untuk setiap kategori kondisi menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa foto contoh untuk setiap kategori kondisi menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
