import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "bike-lanes",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Main Street actually recorded fewer injuries after the lanes opened.",
        },
        {
          correct: true,
          label:
            "Injuries rose slightly, but cyclists doubled, so each rider's risk fell.",
        },
        {
          correct: false,
          label:
            "Injuries on Main Street were caused mostly by pedestrians, not cars.",
        },
        {
          correct: false,
          label:
            "The lanes on Main Street were built more recently than the others.",
        },
        {
          correct: false,
          label:
            "Main Street had fewer cyclists after the lanes than before them.",
        },
      ],
    },
  },
};

export default item;
