import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt{58}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{10}$$",
        },
        {
          correct: false,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
        {
          correct: true,
          label: "$$4$$",
        },
      ],
    },
  },
};

export default item;
