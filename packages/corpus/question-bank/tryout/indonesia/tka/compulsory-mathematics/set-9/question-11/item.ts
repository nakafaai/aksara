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
          label: "$$84\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$168\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$24\\sqrt{85}\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$264\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$336\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
