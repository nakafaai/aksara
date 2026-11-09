import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Produksi padi Desa Mekarsari naik $$20\\%$$ dari tahun 2024 ke tahun 2025.",
        },
        {
          column: 1,
          label:
            "Total produksi padi ketiga desa pada tahun 2026 adalah 414 ton.",
        },
        {
          column: 2,
          label:
            "Rata-rata produksi padi Desa Sukamaju selama tiga tahun itu lebih tinggi daripada rata-rata Desa Harapan.",
        },
        {
          column: 2,
          label:
            "Setiap desa mengalami kenaikan produksi padi dari tahun 2025 ke tahun 2026.",
        },
      ],
    },
  },
};

export default item;
