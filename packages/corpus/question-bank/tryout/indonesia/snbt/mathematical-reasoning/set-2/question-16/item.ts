import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\text{Rp}70{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}60{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}65{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}67{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}75{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
