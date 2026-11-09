import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "coral-bleaching",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Alga di dalam jaringan karang memberi karang sebagian besar makanannya.",
        },
        {
          column: 1,
          label: "Karang yang memutih dapat pulih jika suhu air segera turun.",
        },
        {
          column: 2,
          label: "Terumbu karang menutupi sekitar seperempat dasar laut.",
        },
        {
          column: 2,
          label: "Jeda antara peristiwa pemutihan massal kini makin panjang.",
        },
      ],
    },
  },
};

export default item;
