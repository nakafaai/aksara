import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "measles-coverage",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Northgate's coverage was $$15$$ percentage points below the level that agencies aim for.",
        },
        {
          column: 2,
          label:
            "Every district reached at least $$95\\%$$ coverage except Northgate and Eastport.",
        },
        {
          column: 2,
          label: "The table shows that the outbreak began in Northgate.",
        },
        {
          column: 1,
          label:
            "Raising Northgate's coverage to $$95\\%$$ would have meant vaccinating about $$1{,}500$$ more of its children.",
        },
      ],
    },
  },
};

export default item;
