import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(240\\pi-180\\sqrt{3})$$ liter",
        },
        {
          correct: false,
          label: "$$(480\\pi-180\\sqrt{3})$$ liter",
        },
        {
          correct: false,
          label: "$$480\\pi$$ liter",
        },
        {
          correct: false,
          label: "$$540\\pi$$ liter",
        },
        {
          correct: true,
          label: "$$(480\\pi+180\\sqrt{3})$$ liter",
        },
      ],
    },
  },
};

export default item;
