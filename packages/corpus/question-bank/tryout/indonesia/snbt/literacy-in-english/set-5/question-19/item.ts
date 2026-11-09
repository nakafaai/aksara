import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "great-stink",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "To show that he planned for a city larger than the one he served",
        },
        {
          correct: false,
          label:
            "To criticise him for spending more of the board's money than necessary",
        },
        {
          correct: false,
          label:
            "To explain why the river smelled so strongly in the summer of 1858",
        },
        {
          correct: false,
          label:
            "To prove that the sewers have never been too small at any time since",
        },
        {
          correct: false,
          label:
            "To suggest that he had probably miscalculated the original sizes",
        },
      ],
    },
  },
};

export default item;
