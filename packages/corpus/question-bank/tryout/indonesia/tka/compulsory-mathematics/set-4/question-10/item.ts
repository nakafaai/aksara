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
          label: "$$2{,}25\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{21}\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$9\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$11{,}25\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
