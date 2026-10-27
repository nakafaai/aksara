import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}20{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}16{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}18{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}25{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}32{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
