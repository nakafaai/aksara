import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{.}268$$ und $$293$$ Personen",
        },
        {
          isCorrect: true,
          label: "$$1{.}268$$ und $$266$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$1{.}270$$ und $$281$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$1{.}270$$ und $$264$$ Personen",
        },
        {
          isCorrect: false,
          label: "$$1{.}272$$ und $$281$$ Personen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{,}268$$ and $$293$$ people",
        },
        {
          isCorrect: true,
          label: "$$1{,}268$$ and $$266$$ people",
        },
        {
          isCorrect: false,
          label: "$$1{,}270$$ and $$281$$ people",
        },
        {
          isCorrect: false,
          label: "$$1{,}270$$ and $$264$$ people",
        },
        {
          isCorrect: false,
          label: "$$1{,}272$$ and $$281$$ people",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{.}268$$ dan $$293$$ orang",
        },
        {
          isCorrect: true,
          label: "$$1{.}268$$ dan $$266$$ orang",
        },
        {
          isCorrect: false,
          label: "$$1{.}270$$ dan $$281$$ orang",
        },
        {
          isCorrect: false,
          label: "$$1{.}270$$ dan $$264$$ orang",
        },
        {
          isCorrect: false,
          label: "$$1{.}272$$ dan $$281$$ orang",
        },
      ],
    },
  },
};

export default item;
