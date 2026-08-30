import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$120{.}000$$ Rupiah",
        },
        {
          isCorrect: false,
          label: "$$160{.}000$$ Rupiah",
        },
        {
          isCorrect: true,
          label: "$$240{.}000$$ Rupiah",
        },
        {
          isCorrect: false,
          label: "$$200{.}000$$ Rupiah",
        },
        {
          isCorrect: false,
          label: "$$280{.}000$$ Rupiah",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$120{,}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$160{,}000$$ rupiah",
        },
        {
          isCorrect: true,
          label: "$$240{,}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$200{,}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$280{,}000$$ rupiah",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$120{.}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$160{.}000$$ rupiah",
        },
        {
          isCorrect: true,
          label: "$$240{.}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$200{.}000$$ rupiah",
        },
        {
          isCorrect: false,
          label: "$$280{.}000$$ rupiah",
        },
      ],
    },
  },
};

export default item;
