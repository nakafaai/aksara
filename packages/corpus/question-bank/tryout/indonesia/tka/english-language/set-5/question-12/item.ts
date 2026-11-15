import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "songket-loom",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and IV only",
        },
        {
          correct: false,
          label: "I, II, and IV only",
        },
        {
          correct: false,
          label: "IV and V only",
        },
        {
          correct: true,
          label: "I, IV, and V only",
        },
        {
          correct: false,
          label: "I, III, IV, and V only",
        },
      ],
    },
  },
};

export default item;
