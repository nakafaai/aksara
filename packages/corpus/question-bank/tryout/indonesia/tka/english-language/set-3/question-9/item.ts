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
            "The writer decided that every blank must be filled by guessing.",
        },
        {
          isCorrect: false,
          label: "The writer stopped linking supporting evidence.",
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
        {
          isCorrect: true,
          label:
            "The writer learned that honest uncertainty can make records more useful.",
        },
      ],
    },
  },
  stimulusKey: "archive-week",
};

export default item;
