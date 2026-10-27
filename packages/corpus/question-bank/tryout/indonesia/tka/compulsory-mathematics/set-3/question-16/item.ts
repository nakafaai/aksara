import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40+20\\pi$$",
        },
        {
          correct: true,
          label: "$$80+20\\pi$$",
        },
        {
          correct: false,
          label: "$$80+16\\pi$$",
        },
        {
          correct: false,
          label: "$$80+18\\pi$$",
        },
        {
          correct: false,
          label: "$$120+20\\pi$$",
        },
      ],
    },
  },
};

export default item;
