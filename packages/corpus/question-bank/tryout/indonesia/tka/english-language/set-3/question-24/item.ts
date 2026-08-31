import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "To make repair the default even when safety or accessibility evidence is incomplete",
        },
        {
          isCorrect: false,
          label:
            "To treat repair cost as the deciding factor before assessing safety",
        },
        {
          isCorrect: false,
          label:
            "To present repair as generally cheaper without requiring a documented assessment",
        },
        {
          isCorrect: false,
          label: "To keep unsupported equipment in service",
        },
        {
          isCorrect: true,
          label:
            "To argue for a documented repair check that still permits justified replacement",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
