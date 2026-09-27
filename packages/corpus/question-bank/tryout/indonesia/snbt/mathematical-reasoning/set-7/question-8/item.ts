import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp}4{.}680{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}5{.}000{.}000{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp}4{.}700{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}5{.}200{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}5{.}600{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
