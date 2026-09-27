import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp }27{.}500{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }32{.}500{,}00$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp }37{.}500{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }35{.}000{,}00$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp }42{.}500{,}00$$",
        },
      ],
    },
  },
};

export default item;
