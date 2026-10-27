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
          label: "$$\\frac5{18}$$",
        },
        {
          correct: false,
          label: "$$\\frac13$$",
        },
        {
          correct: true,
          label: "$$\\frac7{18}$$",
        },
        {
          correct: false,
          label: "$$\\frac49$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
      ],
    },
  },
};

export default item;
