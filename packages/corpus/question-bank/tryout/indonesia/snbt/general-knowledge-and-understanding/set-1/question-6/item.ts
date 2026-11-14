import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "cabai",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Karena bobot cabai dalam indeks kecil, lonjakan harga cabai hanya sedikit menggerakkan indeks harga konsumen.",
        },
        {
          column: 1,
          label:
            "Harga cabai dapat melonjak tajam walaupun permintaan cabai tidak bertambah.",
        },
        {
          column: 1,
          label:
            "Gejolak harga cabai tetap dapat terjadi walaupun pemerintah daerah sudah memperlancar distribusi antardaerah.",
        },
        {
          column: 2,
          label:
            "Kenaikan suku bunga dapat meredam lonjakan harga cabai dalam jangka pendek asalkan kenaikannya cukup besar.",
        },
      ],
    },
  },
};

export default item;
