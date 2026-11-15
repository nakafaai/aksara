import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "bag-fee",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Fifteen points is a small price for keeping the choice.",
        },
        {
          correct: true,
          label: "A ban looks tidier on paper.",
        },
        {
          correct: false,
          label: "Every bag the charging stalls handed out was paid for.",
        },
        {
          correct: false,
          label: "A charge would raise more money for the drains than a ban.",
        },
        {
          correct: true,
          label: "Shoppers adapt quickly.",
        },
      ],
    },
  },
};

export default item;
