import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10{.}000$$ Stimmen",
        },
        {
          isCorrect: false,
          label: "$$30{.}000$$ Stimmen",
        },
        {
          isCorrect: false,
          label: "$$50{.}000$$ Stimmen",
        },
        {
          isCorrect: true,
          label: "$$60{.}000$$ Stimmen",
        },
        {
          isCorrect: false,
          label: "$$80{.}000$$ Stimmen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$10{,}000$$ votes" },
        { isCorrect: false, label: "$$30{,}000$$ votes" },
        { isCorrect: false, label: "$$50{,}000$$ votes" },
        { isCorrect: true, label: "$$60{,}000$$ votes" },
        { isCorrect: false, label: "$$80{,}000$$ votes" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$10{.}000$$ suara" },
        { isCorrect: false, label: "$$30{.}000$$ suara" },
        { isCorrect: false, label: "$$50{.}000$$ suara" },
        { isCorrect: true, label: "$$60{.}000$$ suara" },
        { isCorrect: false, label: "$$80{.}000$$ suara" },
      ],
    },
  },
};

export default item;
