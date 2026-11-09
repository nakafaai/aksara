import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "machine-pictures",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Many people enjoy making pictures with image generators in their free time.",
        },
        {
          correct: false,
          label:
            "Some image generators can now produce a finished picture in under a second.",
        },
        {
          correct: false,
          label:
            "The Copyright Office receives more applications each year than it did before.",
        },
        {
          correct: false,
          label:
            "Most pictures made with image generators are shared online without any credit.",
        },
        {
          correct: true,
          label:
            "Detailed prompts can fix layout, colour and style so each run looks alike.",
        },
      ],
    },
  },
};

export default item;
