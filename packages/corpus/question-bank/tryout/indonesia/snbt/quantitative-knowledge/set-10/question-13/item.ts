import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$(2-\\sqrt{2})\\text{ cm}$$" },
        { correct: false, label: "$$\\sqrt{2}\\text{ cm}$$" },
        { correct: true, label: "$$2\\sqrt{2}\\text{ cm}$$" },
        { correct: false, label: "$$(2+\\sqrt{2})\\text{ cm}$$" },
        { correct: false, label: "$$(8+6\\sqrt{2})\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
