import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$11$$",
        },
        {
          correct: false,
          label: "$$-1$$",
        },
        {
          correct: false,
          label: "$$-11$$",
        },
        {
          correct: false,
          label: "$$-33$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
      ],
    },
  },
};

export default item;
