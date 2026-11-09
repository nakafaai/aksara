import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "machine-pictures",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "A person who commissions a portrait becomes one of its authors.",
        },
        {
          column: 1,
          label:
            "Photographs have been protected by copyright for more than a hundred years.",
        },
        {
          column: 1,
          label: "The same prompt can produce many different pictures.",
        },
        {
          column: 2,
          label:
            "AI image systems have been shown to be trained unfairly on artists' work.",
        },
      ],
    },
  },
};

export default item;
