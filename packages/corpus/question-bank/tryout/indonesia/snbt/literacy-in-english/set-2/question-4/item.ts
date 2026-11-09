import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Its short-term average effects do not by themselves establish lasting weight loss.",
        },
        {
          correct: false,
          label:
            "It produces identical weight loss for every person who fasts.",
        },
        {
          correct: false,
          label:
            "It is designed primarily as a clinical treatment for obesity.",
        },
        {
          correct: false,
          label: "It permanently reduces fat-free mass and total body water.",
        },
        {
          correct: false,
          label: "It always reduces calorie intake by a fixed amount.",
        },
      ],
    },
  },
};

export default item;
