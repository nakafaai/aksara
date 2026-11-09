import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-raffle",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\dfrac{7}{19}$$" },
        { correct: false, label: "$$\\dfrac25$$" },
        { correct: false, label: "$$\\dfrac12$$" },
        { correct: false, label: "$$\\dfrac{12}{19}$$" },
        { correct: false, label: "$$\\dfrac45$$" },
      ],
    },
  },
};

export default item;
