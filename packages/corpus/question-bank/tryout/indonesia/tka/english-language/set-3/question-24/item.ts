import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "repair-first",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To make repair the default even when safety or accessibility evidence is incomplete",
        },
        {
          correct: false,
          label:
            "To treat repair cost as the deciding factor before assessing safety",
        },
        {
          correct: false,
          label:
            "To present repair as generally cheaper without requiring a documented assessment",
        },
        {
          correct: false,
          label: "To keep unsupported equipment in service",
        },
        {
          correct: true,
          label:
            "To argue for a documented repair check that still permits justified replacement",
        },
      ],
    },
  },
};

export default item;
