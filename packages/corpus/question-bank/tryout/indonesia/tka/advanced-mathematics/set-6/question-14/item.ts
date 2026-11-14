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
          correct: true,
          label: "$$-4$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$14$$",
        },
        {
          correct: false,
          label: "$$-14$$",
        },
        {
          correct: false,
          label: "$$2$$",
        },
      ],
    },
  },
};

export default item;
