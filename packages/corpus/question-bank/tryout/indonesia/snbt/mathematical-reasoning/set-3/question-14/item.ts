import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp}22{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}33{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}51{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}80{.}000{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp}67{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
