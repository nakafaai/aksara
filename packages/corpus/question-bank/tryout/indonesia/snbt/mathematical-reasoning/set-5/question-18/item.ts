import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "menu-nutrition",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$38\\text{ g}$$" },
        { correct: false, label: "$$44\\text{ g}$$" },
        { correct: false, label: "$$46\\text{ g}$$" },
        { correct: false, label: "$$48\\text{ g}$$" },
        { correct: true, label: "$$50\\text{ g}$$" },
      ],
    },
  },
};

export default item;
