import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "rooftop-garden",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "New volunteers read the notebook before changing a zone.",
        },
        {
          correct: false,
          label:
            "The center replaces the zone labels with one roof map because the notebook already records details.",
        },
        {
          correct: false,
          label:
            "The garden's arrangement becomes fixed after the four zones are first labeled.",
        },
        {
          correct: false,
          label:
            "Failed experiments are moved to a separate notebook before new volunteers use the zone.",
        },
        {
          correct: false,
          label:
            "Volunteers tie the tomato frames to the roof railing so the planters remain stable.",
        },
      ],
    },
  },
};

export default item;
