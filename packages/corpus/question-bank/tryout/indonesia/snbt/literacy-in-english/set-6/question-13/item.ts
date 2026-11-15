import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "E-book loans tripled, but the newspaper should have reported the change as $$200\\%$$ rather than as tripling.",
        },
        {
          correct: false,
          label:
            "Total loans rose by only about $$1\\%$$, so the headline should have called it a reading slowdown.",
        },
        {
          correct: false,
          label:
            "The rise in e-books came mostly from new readers, so the people who already borrowed were not reading more.",
        },
        {
          correct: true,
          label:
            "E-book loans started from a small base, and their whole rise matched the fall in print loans, so total loans barely changed.",
        },
        {
          correct: false,
          label:
            "The library's director said that print loans will fall, which shows the figures are wrong.",
        },
      ],
    },
  },
};

export default item;
