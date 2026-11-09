import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bike-lanes",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The citywide figure must have been calculated incorrectly.",
        },
        {
          correct: false,
          label: "River Road became more dangerous than the other two streets.",
        },
        {
          correct: false,
          label:
            "Cycling on River Road would have fallen without the new lane.",
        },
        {
          correct: false,
          label:
            "Every new cyclist on River Road moved there from Main Street.",
        },
        {
          correct: true,
          label:
            "The lane probably attracted extra cyclists beyond the citywide rise.",
        },
      ],
    },
  },
};

export default item;
