import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "congestion-charge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$82$$",
        },
        {
          correct: false,
          label: "About $$27$$",
        },
        {
          correct: false,
          label: "About $$67$$",
        },
        {
          correct: false,
          label: "About $$62$$",
        },
        {
          correct: true,
          label: "About $$55$$",
        },
      ],
    },
  },
};

export default item;
