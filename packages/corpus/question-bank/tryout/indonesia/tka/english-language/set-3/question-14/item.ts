import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "She wants the 2036 class to guess what happened.",
        },
        {
          isCorrect: true,
          label:
            "She accepts responsibility for making her work usable by others.",
        },
        {
          isCorrect: false,
          label: "She regrets checking the archive.",
        },
        {
          isCorrect: false,
          label: "She believes the backup seeds should be hidden.",
        },
        {
          isCorrect: false,
          label:
            "She values completing the 2024 test more than preserving continuity for later classes.",
        },
      ],
    },
  },
  stimulusKey: "future-seeds",
};

export default item;
