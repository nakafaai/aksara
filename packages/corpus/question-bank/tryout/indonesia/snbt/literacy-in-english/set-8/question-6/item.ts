import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "cultivated-meat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Cultivated meat should be reviewed and labelled rather than banned outright.",
        },
        {
          correct: false,
          label:
            "Cultivated meat should replace farmed meat as soon as it becomes cheaper.",
        },
        {
          correct: false,
          label:
            "Governments should ban cultivated meat until it has been eaten for decades.",
        },
        {
          correct: false,
          label:
            "Traditional farmers should be paid to produce cultivated meat in their regions.",
        },
        {
          correct: false,
          label:
            "Food regulators are unable to judge the safety of entirely new products.",
        },
      ],
    },
  },
};

export default item;
