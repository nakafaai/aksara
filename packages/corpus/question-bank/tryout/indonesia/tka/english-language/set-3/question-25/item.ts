import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "repair-first",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Assess safety.",
        },
        {
          correct: true,
          label: "Estimate additional useful life.",
        },
        {
          correct: false,
          label: "Ignore the replacement option.",
        },
        {
          correct: true,
          label: "Record the reason for the final choice.",
        },
      ],
    },
  },
};

export default item;
