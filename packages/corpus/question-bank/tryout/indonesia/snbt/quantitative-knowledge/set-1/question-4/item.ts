import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$24 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$48 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$72 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$96 \\text{ km/h}$$",
        },
        {
          isCorrect: true,
          label: "$$120 \\text{ km/h}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$24 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$48 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$72 \\text{ km/h}$$",
        },
        {
          isCorrect: false,
          label: "$$96 \\text{ km/h}$$",
        },
        {
          isCorrect: true,
          label: "$$120 \\text{ km/h}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$24 \\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$48 \\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$72 \\text{ km/jam}$$",
        },
        {
          isCorrect: false,
          label: "$$96 \\text{ km/jam}$$",
        },
        {
          isCorrect: true,
          label: "$$120 \\text{ km/jam}$$",
        },
      ],
    },
  },
};

export default item;
