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
          label: "$$6\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$13\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$6{,}5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
