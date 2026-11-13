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
          label: "$$288\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$280\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$264{,}5\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$260\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$252\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
