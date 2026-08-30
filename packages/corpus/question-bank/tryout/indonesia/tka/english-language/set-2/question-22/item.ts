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
          label: "Trace a claim to its source.",
        },
        {
          isCorrect: true,
          label: "Match checking effort to possible harm.",
        },
        {
          isCorrect: false,
          label: "Assume professional design proves accuracy.",
        },
        {
          isCorrect: true,
          label: "Use source checking across different subjects.",
        },
      ],
    },
  },
  stimulusKey: "source-checking",
};

export default item;
