import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "After the first sentence of the second paragraph",
        },
        {
          correct: true,
          label:
            "Between the sentence about the salt pans and the sentence about sea lavender in the second paragraph",
        },
        {
          correct: false,
          label:
            "At the end of the third paragraph, after the glasswort stems shrivel",
        },
        {
          correct: false,
          label:
            "At the end of the fourth paragraph, after the leaves glitter with crystals",
        },
        {
          correct: false,
          label:
            "In the last paragraph, right after the sentence about the shifting mud",
        },
      ],
    },
  },
};

export default item;
