import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: false,
          label: "The hottest air in town is found near the bus terminal.",
        },
        {
          isCorrect: true,
          label:
            "Many people walk these routes at midday, mostly without shade.",
        },
        {
          isCorrect: false,
          label: "Shop owners have offered to pay for watering the trees.",
        },
        {
          isCorrect: true,
          label: "Shade made the biggest difference on paved surfaces.",
        },
      ],
    },
  },
  stimulusKey: "shade-trees",
};

export default item;
