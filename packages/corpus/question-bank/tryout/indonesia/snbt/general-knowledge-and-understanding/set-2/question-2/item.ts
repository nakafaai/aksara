import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "gamelan",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "ciri khas",
        },
        {
          column: 1,
          label: "keunikan",
        },
        {
          column: 2,
          label: "keanehan",
        },
        {
          column: 2,
          label: "kemewahan",
        },
      ],
    },
  },
};

export default item;
