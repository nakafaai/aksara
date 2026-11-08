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
          label: "$$120\\text{ cm}$$",
        },
        {
          correct: false,
          label: "sekitar $$126{,}5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "sekitar $$134{,}2\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$140\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$220\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
