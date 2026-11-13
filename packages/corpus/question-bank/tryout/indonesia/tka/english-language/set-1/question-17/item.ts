import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The plant whose stems swell after a flood is the one that keeps salt inside itself.",
        },
        {
          correct: false,
          label:
            "The mudflat and the low marsh stay under the tide for the same length of time.",
        },
        {
          correct: false,
          label: "Glasswort keeps its stems swollen through long dry spells.",
        },
        {
          correct: true,
          label:
            "Sea lavender and the low-marsh grass get rid of salt in the same way.",
        },
        {
          correct: false,
          label: "Salt pans form on ground that the tide covers twice a day.",
        },
      ],
    },
  },
};

export default item;
