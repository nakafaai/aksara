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
          label: "About $$90\\%$$, so a positive result is usually right.",
        },
        {
          correct: true,
          label: "About $$15\\%$$, so most positive results were false alarms.",
        },
        {
          correct: false,
          label:
            "About $$95\\%$$, so the maker's figure describes positive results.",
        },
        {
          correct: false,
          label:
            "About $$85\\%$$, so most people who tested positive had the condition.",
        },
        {
          correct: false,
          label: "About $$1\\%$$, so a positive result tells a person nothing.",
        },
      ],
    },
  },
};

export default item;
