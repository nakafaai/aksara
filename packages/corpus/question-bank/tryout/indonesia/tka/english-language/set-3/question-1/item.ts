import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "rain-market",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Vendors uncover displays after rain so damp air can move across them.",
        },
        {
          correct: true,
          label:
            "A staff member replaces any bridge whose surface becomes loose or slippery.",
        },
        {
          correct: false,
          label: "The drain is hidden beneath a group of chairs.",
        },
        {
          correct: false,
          label:
            "Staff replace bridges by visual judgment without recording the time of inspection.",
        },
        {
          correct: false,
          label: "Paper prints are placed directly in the wet channel.",
        },
      ],
    },
  },
};

export default item;
