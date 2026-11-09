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
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{10}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{10}$$",
        },
        {
          correct: true,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$9$$",
        },
      ],
    },
  },
};

export default item;
