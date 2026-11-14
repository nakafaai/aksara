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
          label: "$$2$$",
        },
        {
          correct: true,
          label: "$$6$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$12$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{20}$$",
        },
      ],
    },
  },
};

export default item;
