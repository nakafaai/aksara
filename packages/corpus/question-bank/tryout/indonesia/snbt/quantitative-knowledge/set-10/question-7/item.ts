import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$6\\text{ cm}$$" },
        { correct: false, label: "$$2\\sqrt{10}\\text{ cm}$$" },
        { correct: false, label: "$$4\\sqrt{3}\\text{ cm}$$" },
        { correct: false, label: "$$2\\sqrt{15}\\text{ cm}$$" },
        { correct: false, label: "$$4\\sqrt{6}\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
