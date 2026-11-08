import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "carnegie-libraries",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "He wanted towns to repay the full cost of the buildings over time.",
        },
        {
          correct: true,
          label:
            "He thought a community that paid for its library would value it.",
        },
        {
          correct: false,
          label:
            "He needed the taxes to keep his steel mills running at a profit.",
        },
        {
          correct: false,
          label:
            "He wanted to stop small towns from receiving library buildings.",
        },
        {
          correct: false,
          label:
            "He may have planned to sell the buildings back to the towns later.",
        },
      ],
    },
  },
};

export default item;
