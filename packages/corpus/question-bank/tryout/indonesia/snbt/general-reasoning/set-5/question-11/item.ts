import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      columns: ["Pasti benar", "Tidak pasti benar"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tidak semua bibit yang diberi pupuk kompos adalah bibit tanaman buah.",
        },
        {
          column: 2,
          label:
            "Jika sebuah bibit disemai di rumah kaca, bibit itu tidak dikirim ke Desa Sukamaju.",
        },
        {
          column: 2,
          label:
            "Semua bibit yang berumur $$3$$ bulan atau lebih adalah bibit tanaman buah.",
        },
        {
          column: 1,
          label:
            "Sebagian bibit yang berumur kurang dari $$3$$ bulan tidak dikirim ke Desa Sukamaju.",
        },
      ],
    },
  },
};

export default item;
