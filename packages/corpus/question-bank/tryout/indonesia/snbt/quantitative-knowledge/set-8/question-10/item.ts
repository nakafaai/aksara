import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$13\\text{ cm}$$" },
        { correct: true, label: "$$\\sqrt{193}\\text{ cm}$$" },
        { correct: false, label: "$$\\sqrt{241}\\text{ cm}$$" },
        { correct: false, label: "$$\\sqrt{265}\\text{ cm}$$" },
        { correct: false, label: "$$19\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
