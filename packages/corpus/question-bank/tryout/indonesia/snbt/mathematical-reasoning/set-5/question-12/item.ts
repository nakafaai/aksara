import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "recycling-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0\\text{ kg}$$, tanpa tambahan" },
        { correct: false, label: "$$0{,}2\\text{ kg}$$" },
        { correct: false, label: "$$0{,}4\\text{ kg}$$" },
        { correct: true, label: "$$0{,}7\\text{ kg}$$" },
        { correct: false, label: "$$1{,}0\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
