import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bike-share",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$116\\text{ menit}$$" },
        { correct: false, label: "$$184\\text{ menit}$$" },
        { correct: true, label: "$$190\\text{ menit}$$" },
        { correct: false, label: "$$220\\text{ menit}$$" },
        { correct: false, label: "$$250\\text{ menit}$$" },
      ],
    },
  },
};

export default item;
