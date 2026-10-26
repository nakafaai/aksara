import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "comparison",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The writer treated a plausible memory as enough to complete an uncertain label.",
        },
        {
          correct: false,
          label: "The writer stopped linking supporting evidence.",
        },
        {
          correct: true,
          label:
            "The writer learned that honest uncertainty can make records more useful.",
        },
        {
          correct: false,
          label:
            "The writer concluded that memories and objects are identical sources.",
        },
        {
          correct: false,
          label: "The writer refused to describe photographs without names.",
        },
      ],
    },
  },
  stimulus: "archive-week",
};

export default item;
