import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$85 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$95 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$80 \\text{ km/h}$$",
        },
        {
          isCorrect: true,
          label: "$$75 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$90 \\text{ km/h}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$85 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$95 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$80 \\text{ km/h}$$",
        },
        {
          isCorrect: true,
          label: "$$75 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$90 \\text{ km/h}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$85 \\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$95 \\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$80 \\text{ km/jam}$$",
        },
        {
          isCorrect: true,
          label: "$$75 \\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$90 \\text{ km/jam}$$",
        },
      ],
    },
  },
};

export default item;
