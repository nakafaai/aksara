import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\text{Rp}3{.}600{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}000{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}200{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}400{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}800{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
