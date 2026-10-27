import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "explicit-information",
  },
  stimulus: "repair-first",
  versions: {
    en: {
      columns: ["Repair benefit", "Replacement reason"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "A worn wheel can be changed without replacing the whole device.",
        },
        {
          column: 2,
          label: "An unapproved battery would be required.",
        },
        {
          column: 2,
          label: "Old equipment no longer meets accessibility needs.",
        },
      ],
    },
  },
};

export default item;
