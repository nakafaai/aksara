import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "swim-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The course proves that every student could learn to swim in four weeks.",
        },
        {
          correct: true,
          label:
            "More volunteers could float on their back for one minute after the course than before it.",
        },
        {
          correct: false,
          label:
            "The volunteers were chosen at random from all of the school's students.",
        },
        {
          correct: true,
          label:
            "The number of volunteers who could swim 25 meters rose by 13.",
        },
      ],
    },
  },
};

export default item;
