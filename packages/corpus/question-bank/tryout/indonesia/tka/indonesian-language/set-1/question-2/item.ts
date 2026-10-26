import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      columns: ["Masukan", "Proses", "Keluaran"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Persediaan benih di dalam lemari sebelum dipinjam",
        },
        {
          column: 2,
          label: "Pengeringan benih setelah panen",
        },
        {
          column: 3,
          label: "Kartu riwayat yang telah diisi",
        },
      ],
    },
  },
  stimulus: "seed-library",
};

export default item;
