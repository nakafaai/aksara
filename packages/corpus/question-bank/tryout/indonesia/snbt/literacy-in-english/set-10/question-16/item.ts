import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "river-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "He marks the occasion in his own quiet ways rather than in the words that others use for it.",
        },
        {
          correct: false,
          label:
            "He openly resents the people who rode the ferry only because it was the last day.",
        },
        {
          correct: false,
          label:
            "He has been looking forward to retiring and is relieved that the bridge is finished.",
        },
        {
          correct: true,
          label: "He is more moved by the ending than his manner lets on.",
        },
        {
          correct: false,
          label:
            "He believes the new bridge will be unsafe whenever the river is high.",
        },
      ],
    },
  },
};

export default item;
