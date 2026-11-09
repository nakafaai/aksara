import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "ibn-battuta",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It should be ignored, because some passages were borrowed from others.",
        },
        {
          correct: false,
          label:
            "It is entirely accurate, because many descriptions match other sources.",
        },
        {
          correct: true,
          label:
            "It is valuable but must be checked, since some parts are doubtful.",
        },
        {
          correct: false,
          label:
            "It is useful only for its account of China in the fourteenth century.",
        },
        {
          correct: false,
          label:
            "It was written mainly to entertain the sultan rather than to record events.",
        },
      ],
    },
  },
};

export default item;
