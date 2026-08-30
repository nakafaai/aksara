import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Deshalb",
        },
        {
          isCorrect: false,
          label: "Außerdem",
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
            "Geordnete Prüfung einer Änderung: Ausstellung von Schülerarbeiten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Therefore",
        },
        {
          isCorrect: false,
          label: "Moreover",
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
          label: "A structured test of one change: student work exhibition",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Selain itu",
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
          label: "Uji Teratur atas Satu Perubahan: pameran karya siswa",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
