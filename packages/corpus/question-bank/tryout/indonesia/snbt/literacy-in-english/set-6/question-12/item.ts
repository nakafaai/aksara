import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Most of the library's loans in 2024 were e-books.",
        },
        {
          column: 1,
          label:
            "The number of extra e-book loans in 2024 equals the fall in print loans.",
        },
        {
          column: 2,
          label: "The library lent fewer items in total in 2024 than in 2023.",
        },
        {
          column: 1,
          label:
            "Audiobook loans grew by a larger percentage than the library's total loans.",
        },
        {
          column: 2,
          label:
            "The tripling of e-book loans shows that the city's people read more in 2024.",
        },
      ],
    },
  },
};

export default item;
