import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "stair-design",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$416\\text{ cm}$$" },
        { correct: false, label: "$$432\\text{ cm}$$" },
        { correct: false, label: "$$494\\text{ cm}$$" },
        { correct: false, label: "$$540\\text{ cm}$$" },
        { correct: true, label: "$$608\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
