import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "blood-donor",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac{607}{780}$$" },
        { correct: false, label: "$$\\dfrac{48}{65}$$" },
        { correct: false, label: "$$\\dfrac{16}{39}$$" },
        { correct: false, label: "$$\\dfrac{18}{65}$$" },
        { correct: true, label: "$$\\dfrac{8}{39}$$" },
      ],
    },
  },
};

export default item;
