import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "right-repair",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Independent repair shops are often small local businesses.",
        },
        {
          column: 2,
          label: "Manufacturers' safety concerns about repairs have no basis.",
        },
        {
          column: 1,
          label:
            "Publishing repair instructions can reduce poorly done repairs.",
        },
        {
          column: 2,
          label:
            "The European Union requires owners of household appliances to repair them rather than replace them.",
        },
      ],
    },
  },
};

export default item;
