import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: true,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A$$ und $$C$$ sind gleichauf die besten",
        },
        {
          isCorrect: false,
          label: "$$B$$ und $$C$$ sind gleichauf die besten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: true,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A$$ and $$C$$ tie for best",
        },
        {
          isCorrect: false,
          label: "$$B$$ and $$C$$ tie for best",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: true,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A$$ dan $$C$$ sama-sama terbaik",
        },
        {
          isCorrect: false,
          label: "$$B$$ dan $$C$$ sama-sama terbaik",
        },
      ],
    },
  },
};

export default item;
