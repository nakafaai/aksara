import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }12{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }12{.}100{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }12{.}200{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }12{.}500{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }12{.}320{,}00$$",
        },
      ],
    },
  },
};

export default item;
