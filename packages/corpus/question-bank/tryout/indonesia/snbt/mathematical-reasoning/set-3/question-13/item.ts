import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "floor-tiles",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$162$$" },
        { correct: true, label: "$$180$$" },
        { correct: false, label: "$$198$$" },
        { correct: false, label: "$$204$$" },
        { correct: false, label: "$$240$$" },
      ],
    },
  },
};

export default item;
