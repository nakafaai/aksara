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
          correct: false,
          label: "$$-7$$",
        },
        {
          correct: true,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$-\\frac52$$",
        },
        {
          correct: false,
          label: "$$-1$$",
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
