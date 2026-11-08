import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "paper-folding",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1{,}5$$" },
        { correct: false, label: "$$4$$" },
        { correct: true, label: "$$16$$" },
        { correct: false, label: "$$32$$" },
        { correct: false, label: "$$64$$" },
      ],
    },
  },
};

export default item;
