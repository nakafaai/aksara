import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac16$$",
        },
        {
          correct: false,
          label: "$$\\frac5{24}$$",
        },
        {
          correct: true,
          label: "$$\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\frac13$$",
        },
        {
          correct: false,
          label: "$$\\frac5{12}$$",
        },
      ],
    },
  },
};

export default item;
