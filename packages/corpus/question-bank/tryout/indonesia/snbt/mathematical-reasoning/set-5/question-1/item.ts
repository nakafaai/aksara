import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }27{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }32{.}500{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }37{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }35{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }42{.}500{,}00$$",
        },
      ],
    },
  },
};

export default item;
