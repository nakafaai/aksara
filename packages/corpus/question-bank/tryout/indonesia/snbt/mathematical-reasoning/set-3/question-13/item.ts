import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "stair-design",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$810\\text{ cm}$$" },
        { correct: false, label: "$$858\\text{ cm}$$" },
        { correct: true, label: "$$990\\text{ cm}$$" },
        { correct: false, label: "$$1{.}020\\text{ cm}$$" },
        { correct: false, label: "$$1{.}050\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
