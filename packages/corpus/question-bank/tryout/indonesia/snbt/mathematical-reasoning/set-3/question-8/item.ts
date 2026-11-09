import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "lawn-sprinklers",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6\\text{ m}$$" },
        { correct: false, label: "$$6{,}5\\text{ m}$$" },
        { correct: false, label: "$$4\\sqrt3\\text{ m}$$" },
        { correct: false, label: "$$7\\text{ m}$$" },
        { correct: true, label: "$$2\\sqrt{13}\\text{ m}$$" },
      ],
    },
  },
};

export default item;
