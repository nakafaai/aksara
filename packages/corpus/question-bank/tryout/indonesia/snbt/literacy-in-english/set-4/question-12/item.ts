import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "liver-screening",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "More adults without the condition tested positive than adults with it.",
        },
        {
          column: 2,
          label:
            "Because the test misses one in ten people who have the condition, about $$1{,}000$$ of last year's adults with the condition were not detected.",
        },
        {
          column: 1,
          label:
            "A negative result was very strong evidence that the person did not have the condition.",
        },
        {
          column: 2,
          label:
            "The maker's figure of $$95\\%$$ means that $$95\\%$$ of positive results are correct.",
        },
        {
          column: 1,
          label:
            "If the condition were ten times as common, with the same error rates, a larger share of positive results would be correct.",
        },
      ],
    },
  },
};

export default item;
