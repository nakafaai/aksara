import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Repeated failures across identical items reveal a design problem.",
        },
        {
          isCorrect: false,
          label: "Every broken object must be kept forever.",
        },
        {
          isCorrect: false,
          label: "Safety guards may be removed to reduce cost.",
        },
        {
          isCorrect: false,
          label: "Replacement options should never be compared.",
        },
        {
          isCorrect: false,
          label: "Old equipment always uses less energy.",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
