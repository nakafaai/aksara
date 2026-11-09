import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "coherence",
  },
  stimulus: "screen-printing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jembatan tua di kota itu dibangun lebih dari seratus tahun lalu.",
        },
        {
          correct: false,
          label: "Kantong plastik sebaiknya dibakar setelah dipakai.",
        },
        {
          correct: false,
          label: "Oleh karena itu, Pak Darto menutup usaha sablonnya.",
        },
        {
          correct: true,
          label:
            "Berkat tas kain, mesin sablon Pak Darto kini jarang menganggur.",
        },
        {
          correct: false,
          label: "Namun, tidak ada toko yang mau memesan tas kain.",
        },
      ],
    },
  },
};

export default item;
