import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "subscription-churn",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "At the end of September, Lumen had only about $$10$$ thousand more paying subscribers than at the end of June.",
        },
        {
          column: 2,
          label:
            "Lumen's subscriber count grew by a larger share in October to December than in July to September.",
        },
        {
          column: 1,
          label:
            "More subscribers were paying at the end of December than at the end of September.",
        },
        {
          column: 2,
          label:
            "The churn rate in October to December was higher than in July to September.",
        },
        {
          column: 1,
          label:
            "Lumen's number of paying subscribers rose by more in October to December than in January to June combined.",
        },
      ],
    },
  },
};

export default item;
