import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Public organizations should check repairability before replacement.",
        },
        {
          isCorrect: false,
          label:
            "The passage says that a repair should not become an automatic rule.",
        },
        {
          isCorrect: false,
          label:
            "The passage says that maintenance records can reveal repeated failures.",
        },
        {
          isCorrect: false,
          label:
            "The passage states that an unapproved battery may create greater risk.",
        },
        {
          isCorrect: false,
          label:
            "The passage uses the word transparent to describe the repair-first check.",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
