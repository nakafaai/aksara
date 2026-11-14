import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$15\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$10\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
