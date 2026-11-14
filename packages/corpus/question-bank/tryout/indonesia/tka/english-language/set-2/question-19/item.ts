import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "umbrella",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I and III only",
        },
        {
          correct: false,
          label: "I only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "III and IV only",
        },
        {
          correct: false,
          label: "I, III, and IV only",
        },
      ],
    },
  },
};

export default item;
