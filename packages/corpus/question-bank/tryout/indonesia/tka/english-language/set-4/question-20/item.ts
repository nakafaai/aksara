import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "reader-response",
  },
  stimulus: "fish-tank",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and III only",
        },
        {
          correct: false,
          label: "III only",
        },
        {
          correct: true,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "II, III, and IV only",
        },
        {
          correct: false,
          label: "I, II, III, and IV",
        },
      ],
    },
  },
};

export default item;
