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
          label: "$$4\\pi+9$$",
        },
        {
          correct: false,
          label: "$$80-4\\pi$$",
        },
        {
          correct: false,
          label: "$$71+4\\pi$$",
        },
        {
          correct: true,
          label: "$$71-4\\pi$$",
        },
        {
          correct: false,
          label: "$$80-9\\pi$$",
        },
      ],
    },
  },
};

export default item;
