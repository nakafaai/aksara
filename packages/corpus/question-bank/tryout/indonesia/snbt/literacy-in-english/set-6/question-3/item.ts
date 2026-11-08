import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "half-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The ducks were keeping watch on the researchers' cameras.",
        },
        {
          correct: false,
          label:
            "Ducks in the middle of the row were unable to open their eyes while asleep.",
        },
        {
          correct: false,
          label: "The open eye was resting while the closed eye kept watch.",
        },
        {
          correct: false,
          label: "Ducks may prefer to look at other ducks while they sleep.",
        },
        {
          correct: true,
          label:
            "The ducks used their waking half of the brain to watch for danger.",
        },
      ],
    },
  },
};

export default item;
