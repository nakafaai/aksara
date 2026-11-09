import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "railway-time",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Bristol's local noon came about ten minutes after London's.",
        },
        {
          column: 2,
          label:
            "Greenwich time became the legal time in Great Britain in 1840.",
        },
        {
          column: 2,
          label: "The American railroads agreed on six time zones in 1883.",
        },
        {
          column: 1,
          label:
            "The United States government made the time zones law in 1918.",
        },
      ],
    },
  },
};

export default item;
