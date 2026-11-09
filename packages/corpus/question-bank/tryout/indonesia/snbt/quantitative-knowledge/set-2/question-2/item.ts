import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2$$" },
        { correct: false, label: "$$4$$" },
        { correct: false, label: "$$2\\sqrt{15}$$" },
        { correct: false, label: "$$4+\\sqrt{15}$$" },
        { correct: true, label: "$$8$$" },
      ],
    },
  },
};

export default item;
