import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "classroom-points",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pupils who once read for badges kept reading after the badges stopped.",
        },
        {
          correct: false,
          label:
            "Pupils in classes with leaderboards finished more exercises each week.",
        },
        {
          correct: false,
          label:
            "Pupils near the bottom of leaderboards often felt discouraged by them.",
        },
        {
          correct: false,
          label:
            "Teachers found points quick and easy to add to their existing lessons.",
        },
        {
          correct: false,
          label:
            "Some pupils might prefer badges to certificates as a type of reward.",
        },
      ],
    },
  },
};

export default item;
