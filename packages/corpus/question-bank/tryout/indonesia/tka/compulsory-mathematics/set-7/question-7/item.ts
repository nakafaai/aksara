import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$20\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$24\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$26\\text{ m}^3$$",
        },
        {
          correct: true,
          label: "$$28\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
