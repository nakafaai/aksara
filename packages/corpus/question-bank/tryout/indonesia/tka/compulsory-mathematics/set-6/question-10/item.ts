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
          label: "$$288\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$72\\sqrt{6}\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$32\\sqrt{15}\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$64\\sqrt{3}\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$96\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
