import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "liver-screening",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "About $$15\\%$$",
        },
        {
          correct: true,
          label: "About $$67\\%$$",
        },
        {
          correct: false,
          label: "About $$90\\%$$",
        },
        {
          correct: false,
          label: "About $$95\\%$$",
        },
        {
          correct: false,
          label: "About $$50\\%$$",
        },
      ],
    },
  },
};

export default item;
