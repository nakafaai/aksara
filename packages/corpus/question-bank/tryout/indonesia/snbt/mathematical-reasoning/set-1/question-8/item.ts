import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "rain-tank",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$19{,}25\\text{ m}^2$$" },
        { correct: false, label: "$$123{,}2\\text{ m}^2$$" },
        { correct: false, label: "$$154\\text{ m}^2$$" },
        { correct: true, label: "$$192{,}5\\text{ m}^2$$" },
        { correct: false, label: "$$240\\text{ m}^2$$" },
      ],
    },
  },
};

export default item;
