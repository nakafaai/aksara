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
          isCorrect: false,
          label: "Inzwischen",
        },
        {
          isCorrect: false,
          label: "Dagegen",
        },
        {
          isCorrect: true,
          label: "Deshalb",
        },
        {
          isCorrect: false,
          label: "Geordnete Prüfung einer Änderung: Tag der offenen Labortür",
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
          isCorrect: false,
          label: "Meanwhile",
        },
        {
          isCorrect: false,
          label: "However",
        },
        {
          isCorrect: true,
          label: "Therefore",
        },
        {
          isCorrect: false,
          label: "A structured test of one change: open laboratory tour",
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
          isCorrect: false,
          label: "Sementara itu",
        },
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: true,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: tur laboratorium terbuka",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
