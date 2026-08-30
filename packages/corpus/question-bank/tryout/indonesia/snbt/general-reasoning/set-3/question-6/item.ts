import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{it}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{pit}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{sit}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{nit}$$",
        },
        {
          isCorrect: false,
          label: "nichts davon",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{it}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{pit}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{sit}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{nit}$$",
        },
        {
          isCorrect: false,
          label: "none of the above",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{it}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{pit}$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{sit}$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{nit}$$",
        },
        {
          isCorrect: false,
          label: "tidak ada satupun",
        },
      ],
    },
  },
};

export default item;
