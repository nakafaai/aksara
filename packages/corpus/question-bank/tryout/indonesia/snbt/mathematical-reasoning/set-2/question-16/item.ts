import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}70{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}60{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}65{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}67{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}75{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
