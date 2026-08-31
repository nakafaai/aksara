import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Daher",
        },
        {
          isCorrect: false,
          label: "Außerdem",
        },
        {
          isCorrect: false,
          label: "Mit anderen Worten",
        },
        {
          isCorrect: false,
          label: "Zuvor",
        },
        {
          isCorrect: true,
          label: "Dennoch",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Therefore",
        },
        {
          isCorrect: false,
          label: "In addition",
        },
        {
          isCorrect: false,
          label: "In other words",
        },
        {
          isCorrect: false,
          label: "Previously",
        },
        {
          isCorrect: true,
          label: "Nevertheless",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Oleh karena itu",
        },
        {
          isCorrect: false,
          label: "Selain itu",
        },
        {
          isCorrect: false,
          label: "Dengan kata lain",
        },
        {
          isCorrect: false,
          label: "Sebelumnya",
        },
        {
          isCorrect: true,
          label: "Meskipun demikian",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
