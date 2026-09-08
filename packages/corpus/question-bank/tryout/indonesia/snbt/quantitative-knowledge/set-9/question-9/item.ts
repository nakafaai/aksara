import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(-\\infty,5]$$",
        },
        {
          isCorrect: false,
          label: "$$(2,5]$$",
        },
        {
          isCorrect: false,
          label: "$$(-\\infty,-3)\\cup(2,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(-\\infty,-3)\\cup[2,5]$$",
        },
        {
          isCorrect: true,
          label: "$$(-\\infty,-3)\\cup(2,5]$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(-\\infty,5]$$",
        },
        {
          isCorrect: false,
          label: "$$(2,5]$$",
        },
        {
          isCorrect: false,
          label: "$$(-\\infty,-3)\\cup(2,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(-\\infty,-3)\\cup[2,5]$$",
        },
        {
          isCorrect: true,
          label: "$$(-\\infty,-3)\\cup(2,5]$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$(-\\infty,5]$$",
        },
        {
          isCorrect: false,
          label: "$$(2,5]$$",
        },
        {
          isCorrect: false,
          label: "$$(-\\infty,-3)\\cup(2,5)$$",
        },
        {
          isCorrect: false,
          label: "$$(-\\infty,-3)\\cup[2,5]$$",
        },
        {
          isCorrect: true,
          label: "$$(-\\infty,-3)\\cup(2,5]$$",
        },
      ],
    },
  },
};

export default item;
