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
          label: "$$9\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3\\sqrt{34}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{14}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
