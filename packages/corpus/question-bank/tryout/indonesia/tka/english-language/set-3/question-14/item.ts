import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "future-seeds",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "She wants the 2036 class to guess what happened.",
        },
        {
          correct: true,
          label:
            "She accepts responsibility for making her work usable by others.",
        },
        {
          correct: false,
          label: "She regrets checking the archive.",
        },
        {
          correct: false,
          label: "She believes the backup seeds should be hidden.",
        },
        {
          correct: false,
          label:
            "She values completing the 2024 test more than preserving continuity for later classes.",
        },
      ],
    },
  },
};

export default item;
