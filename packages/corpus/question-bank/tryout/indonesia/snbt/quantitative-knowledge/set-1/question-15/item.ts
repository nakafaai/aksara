import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2\\sqrt{10}$$" },
        { correct: false, label: "$$5+\\sqrt{13}$$" },
        { correct: false, label: "$$2+2\\sqrt{13}$$" },
        { correct: false, label: "$$4+2\\sqrt{10}$$" },
        { correct: true, label: "$$6\\sqrt2$$" },
      ],
    },
  },
};

export default item;
