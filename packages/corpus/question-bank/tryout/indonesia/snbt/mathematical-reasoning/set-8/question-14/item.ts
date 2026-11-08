import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-vaccination",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\dfrac16$$" },
        { correct: false, label: "$$\\dfrac{4}{15}$$" },
        { correct: true, label: "$$\\dfrac25$$" },
        { correct: false, label: "$$\\dfrac{5}{12}$$" },
        { correct: false, label: "$$\\dfrac58$$" },
      ],
    },
  },
};

export default item;
