import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "tool-library",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, III, and V only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "III only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
        {
          correct: true,
          label: "I and III only",
        },
      ],
    },
  },
};

export default item;
