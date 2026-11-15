import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "phone-ban",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$3$$ percentage points, which is about a third of the old pass rate of $$61\\%$$.",
        },
        {
          correct: false,
          label: "About $$6$$ percentage points, two-thirds of the rise.",
        },
        {
          correct: true,
          label: "About $$3$$ percentage points, a third of the rise.",
        },
        {
          correct: false,
          label:
            "About $$3$$ percentage points, which is the size of gain the studies comparing schools found.",
        },
        {
          correct: false,
          label:
            "About $$3\\%$$ of the old pass rate, so the ban made no real difference.",
        },
      ],
    },
  },
};

export default item;
