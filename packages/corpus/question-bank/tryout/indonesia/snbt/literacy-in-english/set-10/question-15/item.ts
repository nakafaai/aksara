import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
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
            "Measured by the growth in subscribers counted, July to September was Lumen's best quarter of the year.",
        },
        {
          column: 2,
          label:
            "Measured by the growth in paying subscribers, July to September was Lumen's best quarter of the year.",
        },
        {
          column: 1,
          label:
            "Some of the people who signed up in July to September went on to pay for Lumen.",
        },
        {
          column: 2,
          label:
            "People who joined through the free trial cancelled at a higher rate than people who joined before July.",
        },
      ],
    },
  },
};

export default item;
