import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "observatory",
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
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "III and IV only",
        },
        {
          correct: false,
          label: "I, II, and IV only",
        },
        {
          correct: true,
          label: "I, III, and IV only",
        },
      ],
    },
  },
};

export default item;
