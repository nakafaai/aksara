import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$100^\\circ$$" },
        { correct: false, label: "$$110^\\circ$$" },
        { correct: false, label: "$$120^\\circ$$" },
        { correct: false, label: "$$140^\\circ$$" },
        { correct: false, label: "$$260^\\circ$$" },
      ],
    },
  },
};

export default item;
