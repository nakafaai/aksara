import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grouping",
  },
  stimulus: "rak",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "P berada di rak atas atau rak tengah.",
        },
        {
          column: 2,
          label: "Rak bawah selalu berisi Q.",
        },
        {
          column: 2,
          label: "Jika N berada di rak tengah, Q berada di rak bawah.",
        },
        {
          column: 1,
          label: "Jika K berada di rak atas, P berada di rak tengah.",
        },
      ],
    },
  },
};

export default item;
