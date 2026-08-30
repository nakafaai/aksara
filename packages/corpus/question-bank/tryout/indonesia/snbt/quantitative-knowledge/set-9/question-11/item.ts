import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}085$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}85$$",
        },
        {
          isCorrect: true,
          label: "$$0{,}095$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}95$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}075$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0.085$$",
        },
        {
          isCorrect: false,
          label: "$$0.85$$",
        },
        {
          isCorrect: true,
          label: "$$0.095$$",
        },
        {
          isCorrect: false,
          label: "$$0.95$$",
        },
        {
          isCorrect: false,
          label: "$$0.075$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$0{,}085$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}85$$",
        },
        {
          isCorrect: true,
          label: "$$0{,}095$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}95$$",
        },
        {
          isCorrect: false,
          label: "$$0{,}075$$",
        },
      ],
    },
  },
};

export default item;
