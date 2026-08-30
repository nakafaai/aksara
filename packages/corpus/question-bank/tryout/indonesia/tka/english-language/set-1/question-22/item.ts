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
          label: "Use several outcome measures.",
        },
        {
          isCorrect: true,
          label: "Look for effects hidden by an average.",
        },
        {
          isCorrect: false,
          label: "Assume later is always better.",
        },
        {
          isCorrect: true,
          label: "Keep the change reversible.",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
