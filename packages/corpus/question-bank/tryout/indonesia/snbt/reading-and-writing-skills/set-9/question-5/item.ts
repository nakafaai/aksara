import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Außerdem",
        },
        {
          isCorrect: true,
          label: "Deshalb",
        },
        {
          isCorrect: false,
          label: "Inzwischen",
        },
        {
          isCorrect: false,
          label: "Dagegen",
        },
        {
          isCorrect: false,
          label:
            "Geordnete Prüfung einer Änderung: Verteilung von Mangrovensetzlingen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Moreover",
        },
        {
          isCorrect: true,
          label: "Therefore",
        },
        {
          isCorrect: false,
          label: "Meanwhile",
        },
        {
          isCorrect: false,
          label: "However",
        },
        {
          isCorrect: false,
          label:
            "A structured test of one change: mangrove seedling distribution",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Selain itu",
        },
        {
          isCorrect: true,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Sementara itu",
        },
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: pembagian bibit mangrove",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
