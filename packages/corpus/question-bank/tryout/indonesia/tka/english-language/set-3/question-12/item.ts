import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "future-seeds",
  versions: {
    en: {
      columns: ["Initial interpretation", "Later evidence"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "The packet should stay closed until 2040.",
        },
        {
          column: 2,
          label: "The code matched a twelve-year check.",
        },
        {
          column: 2,
          label: "2032 was one checkpoint in a series.",
        },
      ],
    },
  },
};

export default item;
