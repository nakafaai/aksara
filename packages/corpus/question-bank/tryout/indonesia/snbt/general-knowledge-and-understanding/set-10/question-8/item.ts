import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "jamu",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Khasiat obat herbal terstandar didukung bukti ilmiah yang lebih kuat daripada khasiat jamu.",
        },
        {
          column: 1,
          label:
            "Produk yang khasiatnya hanya didasarkan pada pengalaman turun-temurun termasuk kelompok jamu.",
        },
        {
          column: 2,
          label:
            "Semua jamu pasti tidak berkhasiat karena belum diuji pada manusia.",
        },
        {
          column: 2,
          label:
            "Obat herbal terstandar sudah diuji secara klinis pada manusia.",
        },
      ],
    },
  },
};

export default item;
