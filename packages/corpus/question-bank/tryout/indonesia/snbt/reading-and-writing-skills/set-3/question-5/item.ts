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
          isCorrect: false,
          label: "Geordnete Prüfung einer Änderung: Karte der Evakuierungswege",
        },
        {
          isCorrect: true,
          label: "Deshalb",
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
          isCorrect: false,
          label: "A structured test of one change: evacuation route map",
        },
        {
          isCorrect: true,
          label: "Therefore",
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
          isCorrect: false,
          label: "Uji Teratur atas Satu Perubahan: peta jalur evakuasi",
        },
        {
          isCorrect: true,
          label: "Oleh karena itu",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
