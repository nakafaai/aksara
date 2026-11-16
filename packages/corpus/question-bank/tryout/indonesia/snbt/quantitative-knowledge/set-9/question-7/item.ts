import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10^\\circ$$" },
        { correct: false, label: "$$50^\\circ$$" },
        { correct: true, label: "$$60^\\circ$$" },
        { correct: false, label: "$$70^\\circ$$" },
        { correct: false, label: "$$180^\\circ$$" },
      ],
    },
  },
};

export default item;
