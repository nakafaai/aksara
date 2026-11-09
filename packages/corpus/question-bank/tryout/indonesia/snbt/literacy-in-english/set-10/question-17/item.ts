import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "golden-record",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The record's music comes from a single culture chosen by Sagan.",
        },
        {
          column: 1,
          label: "Each of the two Voyager spacecraft carried a record.",
        },
        {
          column: 2,
          label: "The record's images are printed on it as photographs.",
        },
        {
          column: 2,
          label:
            "The spacecraft will come near another star within a few hundred years.",
        },
      ],
    },
  },
};

export default item;
