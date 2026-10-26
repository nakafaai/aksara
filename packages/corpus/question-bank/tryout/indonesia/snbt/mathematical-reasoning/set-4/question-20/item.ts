import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }950{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }1{.}050{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }1{.}150{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }1{.}350{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }1{.}250{,}00$$",
        },
      ],
    },
  },
};

export default item;
