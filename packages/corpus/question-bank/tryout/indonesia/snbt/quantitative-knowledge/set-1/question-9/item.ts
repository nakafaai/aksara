import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{I, II und III}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{I und II}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{II und III}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{I}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{III}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{I, II, and III}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{I and II}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{II and III}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{I}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{III}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{I, II, dan III}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{I dan II}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{II dan III}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{I}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{III}$$",
        },
      ],
    },
  },
};

export default item;
