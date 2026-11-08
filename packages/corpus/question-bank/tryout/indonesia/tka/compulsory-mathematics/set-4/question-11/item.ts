import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7{,}5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$10{,}4\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$12\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$13{,}6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$27\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
