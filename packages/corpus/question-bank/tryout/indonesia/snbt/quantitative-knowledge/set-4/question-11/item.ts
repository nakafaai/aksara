import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$35^\\circ$$" },
        { correct: false, label: "$$55^\\circ$$" },
        { correct: false, label: "$$70^\\circ$$" },
        { correct: false, label: "$$110^\\circ$$" },
        { correct: false, label: "$$145^\\circ$$" },
      ],
    },
  },
};

export default item;
