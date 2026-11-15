import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "main-idea-purpose",
  },
  stimulus: "mangrove-planting",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and III only",
        },
        {
          correct: true,
          label: "I, III, and V only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
        {
          correct: false,
          label: "III, IV, and V only",
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
