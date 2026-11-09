import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4a-4$$",
        },
        {
          correct: false,
          label: "$$4a$$",
        },
        {
          correct: false,
          label: "$$4a+4$$",
        },
        {
          correct: false,
          label: "$$2a-4$$",
        },
        {
          correct: false,
          label: "$$-4$$",
        },
      ],
    },
  },
};

export default item;
