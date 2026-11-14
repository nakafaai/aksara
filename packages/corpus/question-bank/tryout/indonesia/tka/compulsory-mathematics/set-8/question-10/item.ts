import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$13\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$13{,}5\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
