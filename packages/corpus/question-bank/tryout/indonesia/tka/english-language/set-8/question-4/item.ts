import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "train-station",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "It is used as a museum instead of serving passengers.",
        },
        {
          correct: false,
          label: "It has a red tiled roof instead of a metal one.",
        },
        {
          correct: false,
          label: "Its old ticket window has been replaced with a new one.",
        },
        { correct: false, label: "It has more tracks than it used to." },
        { correct: false, label: "Its clock now shows the correct time." },
      ],
    },
  },
};

export default item;
