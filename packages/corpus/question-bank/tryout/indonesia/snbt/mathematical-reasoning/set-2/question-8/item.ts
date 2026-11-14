import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "paint-mixing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0\\text{ liter}$$" },
        { correct: false, label: "$$1\\text{ liter}$$" },
        { correct: false, label: "$$1{,}5\\text{ liter}$$" },
        { correct: true, label: "$$2\\text{ liter}$$" },
        { correct: false, label: "$$4\\text{ liter}$$" },
      ],
    },
  },
};

export default item;
