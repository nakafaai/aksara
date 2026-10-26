import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}22{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}33{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}51{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}80{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}67{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
