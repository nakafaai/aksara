import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "test-optional",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "The rise in admitted students from low-income families is a good result.",
        },
        {
          column: 2,
          label:
            "Entrance tests mainly measure how much coaching a family can afford.",
        },
        {
          column: 1,
          label:
            "Students admitted without scores earned somewhat lower first-year grades than students admitted with scores.",
        },
        {
          column: 2,
          label: "The university should bring back required test scores.",
        },
        {
          column: 2,
          label:
            "Dropping the tests has not lowered the university's standard.",
        },
      ],
    },
  },
};

export default item;
