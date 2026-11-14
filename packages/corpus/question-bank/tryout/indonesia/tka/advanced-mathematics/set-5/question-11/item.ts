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
          label: "$$5\\sqrt{17}\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$27\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$16\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$38\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$11\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
