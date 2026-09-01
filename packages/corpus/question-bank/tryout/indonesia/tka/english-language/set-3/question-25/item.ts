import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Assess safety.",
        },
        {
          isCorrect: true,
          label: "Estimate additional useful life.",
        },
        {
          isCorrect: false,
          label: "Ignore the replacement option.",
        },
        {
          isCorrect: true,
          label: "Record the reason for the final choice.",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
