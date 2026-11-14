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
          correct: true,
          label: "$$(24\\sqrt3+16\\pi)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(24\\sqrt3+8\\pi)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(24\\sqrt3+20\\pi)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(24+16\\pi)\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(48+16\\pi)\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
