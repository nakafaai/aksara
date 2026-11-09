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
          label: "$$\\sqrt{10}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{17}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{14}$$",
        },
        {
          correct: false,
          label: "$$5\\sqrt{14}$$",
        },
        {
          correct: true,
          label: "$$\\sqrt{30}$$",
        },
      ],
    },
  },
};

export default item;
