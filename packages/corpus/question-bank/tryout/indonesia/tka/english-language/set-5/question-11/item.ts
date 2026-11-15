import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "songket-loom",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I, II, and IV only",
        },
        {
          correct: false,
          label: "I and IV only",
        },
        {
          correct: false,
          label: "I, II, III, and IV",
        },
        {
          correct: false,
          label: "II and IV only",
        },
        {
          correct: false,
          label: "I, II, and III only",
        },
      ],
    },
  },
};

export default item;
