import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "explicit-information",
  },
  stimulus: "chili-seedlings",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: true,
          label: "$$36$$",
        },
        {
          correct: false,
          label: "$$32$$",
        },
        {
          correct: false,
          label: "$$27$$",
        },
        {
          correct: false,
          label: "$$30$$",
        },
      ],
    },
  },
};

export default item;
