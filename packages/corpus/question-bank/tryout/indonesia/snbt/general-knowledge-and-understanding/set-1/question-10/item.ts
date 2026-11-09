import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "synonym",
  },
  stimulus: "elektronik",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "memerlukan",
        },
        {
          column: 2,
          label: "menggugat",
        },
        {
          column: 1,
          label: "membutuhkan",
        },
        {
          column: 2,
          label: "mendakwa",
        },
      ],
    },
  },
};

export default item;
