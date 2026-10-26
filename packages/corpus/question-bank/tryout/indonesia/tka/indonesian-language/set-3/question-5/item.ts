import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      columns: ["Mengurangi gangguan", "Memperjelas isi", "Menjaga akses"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Menyediakan earphone",
        },
        {
          column: 2,
          label: "Mengganti nama audio menjadi pertanyaan",
        },
        {
          column: 3,
          label: "Menambahkan transkrip",
        },
      ],
    },
  },
  stimulus: "audio-labels",
};

export default item;
