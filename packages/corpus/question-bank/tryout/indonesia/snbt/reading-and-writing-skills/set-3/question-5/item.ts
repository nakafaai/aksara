import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Im Gegensatz dazu",
        },
        {
          isCorrect: false,
          label: "Daher",
        },
        {
          isCorrect: false,
          label: "Dennoch",
        },
        {
          isCorrect: true,
          label: "Außerdem",
        },
        {
          isCorrect: false,
          label: "Zuvor",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "By contrast",
        },
        {
          isCorrect: false,
          label: "As a result",
        },
        {
          isCorrect: false,
          label: "Nevertheless",
        },
        {
          isCorrect: true,
          label: "In addition",
        },
        {
          isCorrect: false,
          label: "Before that",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: false,
          label: "Akibatnya",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian",
        },
        {
          isCorrect: true,
          label: "Selain itu",
        },
        {
          isCorrect: false,
          label: "Sebelum itu",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
