import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Print books made up a smaller share of all loans in 2024 than in 2023.",
        },
        {
          correct: true,
          label:
            "E-book loans rose by $$200\\%$$, which is the same as saying they tripled.",
        },
        {
          correct: false,
          label: "Audiobook loans rose by more loans than e-book loans did.",
        },
        {
          correct: true,
          label:
            'The director\'s phrase "about the same number of books, in different shapes" fits the change in total loans.',
        },
        {
          correct: true,
          label: "Print loans fell by more loans than audiobook loans rose.",
        },
      ],
    },
  },
};

export default item;
