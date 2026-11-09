import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2\\sqrt2$$" },
        { correct: true, label: "$$6\\sqrt2$$" },
        { correct: false, label: "$$6\\sqrt2+5$$" },
        { correct: false, label: "$$18\\sqrt2$$" },
        { correct: false, label: "$$72$$" },
      ],
    },
  },
};

export default item;
