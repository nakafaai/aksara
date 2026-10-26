import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1035$$",
        },
        {
          correct: false,
          label: "$$900$$",
        },
        {
          correct: false,
          label: "$$990$$",
        },
        {
          correct: false,
          label: "$$1065$$",
        },
        {
          correct: false,
          label: "$$1150$$",
        },
      ],
    },
  },
};

export default item;
