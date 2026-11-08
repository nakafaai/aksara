import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$150$$" },
        { correct: false, label: "$$175$$" },
        { correct: true, label: "$$180$$" },
        { correct: false, label: "$$200$$" },
        { correct: false, label: "$$210$$" },
      ],
    },
  },
};

export default item;
