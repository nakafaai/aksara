import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$60^\\circ$$" },
        { correct: false, label: "$$90^\\circ$$" },
        { correct: true, label: "$$120^\\circ$$" },
        { correct: false, label: "$$180^\\circ$$" },
        { correct: false, label: "$$240^\\circ$$" },
      ],
    },
  },
};

export default item;
