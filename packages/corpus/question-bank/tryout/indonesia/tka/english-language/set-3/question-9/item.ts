import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "comparison",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The writer treated a plausible memory as enough to complete an uncertain label.",
        },
        {
          isCorrect: false,
          label: "The writer stopped linking supporting evidence.",
        },
        {
          isCorrect: true,
          label:
            "The writer learned that honest uncertainty can make records more useful.",
        },
        {
          isCorrect: false,
          label:
            "The writer concluded that memories and objects are identical sources.",
        },
        {
          isCorrect: false,
          label: "The writer refused to describe photographs without names.",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
