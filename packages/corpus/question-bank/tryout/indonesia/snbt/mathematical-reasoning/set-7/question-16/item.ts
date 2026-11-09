import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "temperature-scales",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$32^\\circ\\text{C}$$" },
        { correct: false, label: "$$36^\\circ\\text{C}$$" },
        { correct: false, label: "$$38^\\circ\\text{C}$$" },
        { correct: true, label: "$$40^\\circ\\text{C}$$" },
        { correct: false, label: "$$44^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
