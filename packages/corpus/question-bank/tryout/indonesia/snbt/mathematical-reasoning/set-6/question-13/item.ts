import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}18{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}20{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}25{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}19{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}30{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
