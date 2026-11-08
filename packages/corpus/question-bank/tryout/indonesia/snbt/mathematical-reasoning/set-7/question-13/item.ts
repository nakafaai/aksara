import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "temperature-scales",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$165{,}8^\\circ\\text{C}$$" },
        { correct: true, label: "$$180^\\circ\\text{C}$$" },
        { correct: false, label: "$$197{,}8^\\circ\\text{C}$$" },
        { correct: false, label: "$$215{,}6^\\circ\\text{C}$$" },
        { correct: false, label: "$$324^\\circ\\text{C}$$" },
      ],
    },
  },
};

export default item;
