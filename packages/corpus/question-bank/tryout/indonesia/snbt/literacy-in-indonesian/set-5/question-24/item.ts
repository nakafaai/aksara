import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument",
  },
  stimulus: "keroncong-origin",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Orang yang menyebut langgam Jawa sebagai kemunduran karena menyimpang dari bentuk awal harus menyebut keroncong radio pada dasawarsa 1930-an sebagai kemunduran juga.",
        },
        {
          column: 2,
          label:
            "Campursari menunjukkan bahwa keroncong sedang menuju kepunahan.",
        },
        {
          column: 2,
          label:
            "Kesetiaan pada bentuk awal adalah ukuran terbaik untuk menilai perkembangan keroncong.",
        },
        {
          column: 1,
          label:
            "Daya tahan keroncong berkaitan dengan kesediaannya berubah mengikuti tempat dan zaman.",
        },
      ],
    },
  },
};

export default item;
