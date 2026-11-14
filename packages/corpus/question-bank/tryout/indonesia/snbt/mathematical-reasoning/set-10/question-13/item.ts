import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "hydroponic-nutrient",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$450\\text{ ml}$$" },
        { correct: false, label: "$$460\\text{ ml}$$" },
        { correct: true, label: "$$730\\text{ ml}$$" },
        { correct: false, label: "$$780\\text{ ml}$$" },
        { correct: false, label: "$$1{.}150\\text{ ml}$$" },
      ],
    },
  },
};

export default item;
