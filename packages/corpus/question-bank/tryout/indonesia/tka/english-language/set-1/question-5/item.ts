import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "New volunteers read the notebook before changing a zone.",
        },
        {
          isCorrect: false,
          label:
            "The center replaces the zone labels with one roof map because the notebook already records details.",
        },
        {
          isCorrect: false,
          label:
            "The garden's arrangement becomes fixed after the four zones are first labeled.",
        },
        {
          isCorrect: false,
          label:
            "Failed experiments are moved to a separate notebook before new volunteers use the zone.",
        },
        {
          isCorrect: false,
          label:
            "Volunteers tie the tomato frames to the roof railing so the planters remain stable.",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
