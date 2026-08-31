import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$64{,}89$$",
        },
        {
          isCorrect: false,
          label: "$$64$$",
        },
        {
          isCorrect: false,
          label: "$$65{,}09$$",
        },
        {
          isCorrect: false,
          label: "$$65{,}20$$",
        },
        {
          isCorrect: false,
          label: "$$65{,}34$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$64.89$$",
        },
        {
          isCorrect: false,
          label: "$$64$$",
        },
        {
          isCorrect: false,
          label: "$$65.09$$",
        },
        {
          isCorrect: false,
          label: "$$65.20$$",
        },
        {
          isCorrect: false,
          label: "$$65.34$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$64{,}89$$",
        },
        {
          isCorrect: false,
          label: "$$64$$",
        },
        {
          isCorrect: false,
          label: "$$65{,}09$$",
        },
        {
          isCorrect: false,
          label: "$$65{,}20$$",
        },
        {
          isCorrect: false,
          label: "$$65{,}34$$",
        },
      ],
    },
  },
};

export default item;
