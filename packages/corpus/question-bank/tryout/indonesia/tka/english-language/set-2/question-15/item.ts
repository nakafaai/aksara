import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "sprout",
  versions: {
    en: {
      columns: ["Counts as germinated", "Does not count as germinated"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "A packet B seed whose root first appeared on day 8",
        },
        {
          column: 1,
          label: "A packet A seed with a root of $$3$$ mm on day 4",
        },
        {
          column: 2,
          label: "A seed with a root of $$1$$ mm on day 7",
        },
        {
          column: 2,
          label:
            "A seed that swelled and split its coat but showed no root by day 7",
        },
      ],
    },
  },
};

export default item;
