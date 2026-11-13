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
          label: "$$\\sqrt{274}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{355}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{481}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{565}\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$25\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
