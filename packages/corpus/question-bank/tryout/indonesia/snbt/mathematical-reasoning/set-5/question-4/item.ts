import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp }4{.}702{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }4{.}275{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }427{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }5{.}250{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }400{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
