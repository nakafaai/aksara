import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp}2{.}500{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}000{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp}4{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}5{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}5{.}500{,}00$$",
        },
      ],
    },
  },
};

export default item;
