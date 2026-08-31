import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Allerdings",
        },
        {
          isCorrect: false,
          label: "Vor der Messung",
        },
        {
          isCorrect: false,
          label: "Umgekehrt",
        },
        {
          isCorrect: true,
          label: "Unter diesen Bedingungen",
        },
        {
          isCorrect: false,
          label: "Zum Beispiel",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "However",
        },
        {
          isCorrect: false,
          label: "Before measurement",
        },
        {
          isCorrect: false,
          label: "Conversely",
        },
        {
          isCorrect: true,
          label: "Under those conditions",
        },
        {
          isCorrect: false,
          label: "For example",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Namun",
        },
        {
          isCorrect: false,
          label: "Sebelum pengukuran",
        },
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: true,
          label: "Dalam kondisi tersebut",
        },
        {
          isCorrect: false,
          label: "Misalnya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
