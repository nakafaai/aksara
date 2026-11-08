import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "ibn-battuta",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Much of it was told from memory years later, after most notes were lost.",
        },
        {
          correct: false,
          label:
            "Ibn Juzayy had travelled with Ibn Battuta and later added many of his own adventures.",
        },
        {
          correct: false,
          label:
            "The sultan of Morocco ordered him to praise only Muslim rulers.",
        },
        {
          correct: false,
          label:
            "Ibn Battuta had never learned to read or write during his studies.",
        },
        {
          correct: false,
          label:
            "The book was written in a language that Ibn Battuta did not speak.",
        },
      ],
    },
  },
};

export default item;
