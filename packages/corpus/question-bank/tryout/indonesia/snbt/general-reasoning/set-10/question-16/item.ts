import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grid-logic",
  },
  stimulus: "bazar",
  versions: {
    id: {
      columns: ["Mungkin", "Tidak mungkin"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Stan X-C berada di nomor 4.",
        },
        {
          column: 1,
          label: "Stan XI-C berada tepat di sebelah kanan stan XI-B.",
        },
        {
          column: 2,
          label: "Stan XI-A berada di nomor 3.",
        },
        {
          column: 2,
          label: "Stan XI-C berada di nomor 2.",
        },
      ],
    },
  },
};

export default item;
