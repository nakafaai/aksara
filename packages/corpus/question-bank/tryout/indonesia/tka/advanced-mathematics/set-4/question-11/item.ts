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
          label: "$$60\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$75\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$45\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$36\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
