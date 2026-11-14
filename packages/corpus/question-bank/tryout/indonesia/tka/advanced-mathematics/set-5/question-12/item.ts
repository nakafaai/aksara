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
          label: "$$24\\vec{i}-12\\vec{j}+24\\vec{k}$$",
        },
        {
          correct: false,
          label: "$$4\\vec{i}-2\\vec{j}+4\\vec{k}$$",
        },
        {
          correct: false,
          label: "$$-8\\vec{i}+4\\vec{j}-8\\vec{k}$$",
        },
        {
          correct: false,
          label: "$$6\\vec{i}-3\\vec{j}+6\\vec{k}$$",
        },
        {
          correct: true,
          label: "$$8\\vec{i}-4\\vec{j}+8\\vec{k}$$",
        },
      ],
    },
  },
};

export default item;
