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
          label: "The decision record includes an estimated repair cost.",
        },
        {
          isCorrect: false,
          label: "The passage mentions damaged cables and worn wheels.",
        },
        {
          isCorrect: false,
          label: "An unapproved battery is given as one risk example.",
        },
        {
          isCorrect: false,
          label: "The final paragraph uses the word transparent.",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
