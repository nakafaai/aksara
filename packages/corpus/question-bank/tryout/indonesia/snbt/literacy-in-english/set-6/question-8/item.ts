import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "test-optional",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It rose by $$7$$ percentage points, about $$37\\%$$ of the old share.",
        },
        {
          correct: false,
          label:
            "It rose by $$7$$ percentage points, which is a rise of $$7\\%$$.",
        },
        {
          correct: false,
          label:
            "It rose by $$19$$ percentage points, about $$158\\%$$ of the old share.",
        },
        {
          correct: false,
          label:
            "It rose by $$7$$ percentage points, about $$40\\%$$ of the old share, in line with applications.",
        },
        {
          correct: true,
          label:
            "It rose by $$7$$ percentage points, about $$58\\%$$ of the old share.",
        },
      ],
    },
  },
};

export default item;
