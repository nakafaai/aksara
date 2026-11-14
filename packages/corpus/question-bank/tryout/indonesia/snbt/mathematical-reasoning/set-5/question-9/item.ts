import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "recycling-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$7{,}5\\text{ kg}$$" },
        { correct: false, label: "$$7{,}68\\text{ kg}$$" },
        { correct: false, label: "$$7{,}8\\text{ kg}$$" },
        { correct: false, label: "$$8\\text{ kg}$$" },
        { correct: true, label: "$$8{,}125\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
