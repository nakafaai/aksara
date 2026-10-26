import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "explicit-information",
  },
  versions: {
    en: {
      columns: ["Identifying", "Tracing", "Comparing"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Writing the exact claim in one sentence",
        },
        {
          column: 2,
          label: "Finding the original report behind a screenshot",
        },
        {
          column: 3,
          label: "Checking another source with independent evidence",
        },
      ],
    },
  },
  stimulus: "source-checking",
};

export default item;
