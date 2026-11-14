import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "night-market",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Every food stall must keep a bucket of water beside its stove.",
        },
        {
          column: 2,
          label: "The west lane is where most of the food is sold.",
        },
        {
          column: 1,
          label: "Cloth bags can be bought at the information booth.",
        },
        {
          column: 2,
          label: "Stallholders from any district may sell at the night market.",
        },
      ],
    },
  },
};

export default item;
