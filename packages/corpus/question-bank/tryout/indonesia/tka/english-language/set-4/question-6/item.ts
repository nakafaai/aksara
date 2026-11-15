import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "mangrove-planting",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and V only",
        },
        {
          correct: false,
          label: "I, II, IV, and V only",
        },
        {
          correct: true,
          label: "I, II, and V only",
        },
        {
          correct: false,
          label: "II, III, and V only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
      ],
    },
  },
};

export default item;
