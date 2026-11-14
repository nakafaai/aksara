import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "volcano-hike",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A guide explains how to climb mountains safely in strong wind.",
        },
        {
          correct: true,
          label:
            "Two cousins climb a mountain at night with a guide, reach the summit just before sunrise, and come down after a short stay.",
        },
        {
          correct: false,
          label:
            "Fajar loses his water bottle and has to turn back before the summit.",
        },
        {
          correct: false,
          label:
            "A group of hikers camps overnight at the top of Mount Kembang.",
        },
        {
          correct: false,
          label:
            "Clouds cover the villages below the mountain for a whole day.",
        },
      ],
    },
  },
};

export default item;
