import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung, Pflanzortetiketten auf jedem Tablett, ersetzte die Notwendigkeit, die ursprüngliche Unsicherheit zu messen.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Pflanzortetiketten auf jedem Tablett, führte mehrere nicht trennbare Unterschiede ein.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Pflanzortetiketten auf jedem Tablett, erklärte, warum die Vergleichswerte identisch waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung, Pflanzortetiketten auf jedem Tablett, betraf das Endergebnis statt die Quelle der Unsicherheit.",
        },
        {
          isCorrect: true,
          label:
            "Die geprüfte Änderung bezog sich unmittelbar auf die beobachtete Unsicherheit: Pflanzortetiketten auf jedem Tablett.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change, planting-site labels on every tray, replaced the need to measure the original uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The change, planting-site labels on every tray, introduced several differences that could not be separated.",
        },
        {
          isCorrect: false,
          label:
            "The change, planting-site labels on every tray, explained why the comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "The change, planting-site labels on every tray, addressed the final outcome rather than the source of uncertainty.",
        },
        {
          isCorrect: true,
          label:
            "The change, planting-site labels on every tray, directly addressed the observed uncertainty.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan berupa label lokasi tanam pada setiap baki menggantikan kebutuhan untuk mengukur ketidakpastian awal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label lokasi tanam pada setiap baki menimbulkan beberapa perbedaan yang tidak dapat dipisahkan.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label lokasi tanam pada setiap baki menjelaskan mengapa nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan berupa label lokasi tanam pada setiap baki menanggapi hasil akhir, bukan sumber ketidakpastian.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan berupa label lokasi tanam langsung menanggapi keraguan yang diamati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
