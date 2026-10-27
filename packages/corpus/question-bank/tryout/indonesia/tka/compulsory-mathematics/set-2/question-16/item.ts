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
          label: "$$48\\pi$$",
        },
        {
          correct: false,
          label: "$$36\\pi-48\\sqrt3$$",
        },
        {
          correct: true,
          label: "$$48\\pi-36\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$36\\pi-24\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$24\\pi-36\\sqrt3$$",
        },
      ],
    },
  },
};

export default item;
