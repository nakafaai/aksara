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
          label: "$$32$$",
        },
        {
          correct: false,
          label: "$$50$$",
        },
        {
          correct: false,
          label: "$$86$$",
        },
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: true,
          label: "$$121$$",
        },
      ],
    },
  },
};

export default item;
