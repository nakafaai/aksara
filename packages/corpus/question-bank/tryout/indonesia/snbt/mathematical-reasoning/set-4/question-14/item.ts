import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7\\text{ Tage}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ Tage}$$",
        },
        {
          isCorrect: false,
          label: "$$9\\text{ Tage}$$",
        },
        {
          isCorrect: true,
          label: "$$10\\text{ Tage}$$",
        },
        {
          isCorrect: false,
          label: "$$11\\text{ Tage}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7\\text{ days}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ days}$$",
        },
        {
          isCorrect: false,
          label: "$$9\\text{ days}$$",
        },
        {
          isCorrect: true,
          label: "$$10\\text{ days}$$",
        },
        {
          isCorrect: false,
          label: "$$11\\text{ days}$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$7\\text{ hari}$$",
        },
        {
          isCorrect: false,
          label: "$$8\\text{ hari}$$",
        },
        {
          isCorrect: false,
          label: "$$9\\text{ hari}$$",
        },
        {
          isCorrect: true,
          label: "$$10\\text{ hari}$$",
        },
        {
          isCorrect: false,
          label: "$$11\\text{ hari}$$",
        },
      ],
    },
  },
};

export default item;
