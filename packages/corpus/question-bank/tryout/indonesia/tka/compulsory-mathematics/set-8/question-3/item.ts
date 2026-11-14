import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "grosir",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Baik bagi anggota maupun bukan anggota, cara termurah untuk membawa pulang paling sedikit $$35$$ botol dalam satu nota adalah membeli $$3$$ dus.",
        },
        {
          column: 1,
          label:
            "Jika seorang anggota hanya membeli botol lepas, harga rata-rata per botol yang ia bayar tidak pernah kurang dari $$\\text{Rp}14{.}250$$.",
        },
        {
          column: 2,
          label:
            "Bagi seorang anggota, menambahkan satu botol lepas ke belanjaan dalam nota yang sama tidak pernah membuat tagihannya lebih kecil.",
        },
      ],
    },
  },
};

export default item;
