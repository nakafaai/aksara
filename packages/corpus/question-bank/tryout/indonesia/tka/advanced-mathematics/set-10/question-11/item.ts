import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\vec{i}-2\\vec{j}$$",
        },
        {
          correct: false,
          label: "$$3\\vec{i}-\\vec{j}$$",
        },
        {
          correct: true,
          label: "$$\\vec{i}-\\vec{j}+\\vec{k}$$",
        },
        {
          correct: false,
          label: "$$2\\vec{i}+\\vec{j}-\\vec{k}$$",
        },
        {
          correct: false,
          label: "$$3\\vec{i}+4\\vec{j}+\\vec{k}$$",
        },
      ],
    },
  },
};

export default item;
