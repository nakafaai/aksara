import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "rainfall-harvest",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Irigasi teknis yang luas menyebabkan Sukamaju lebih tahan terhadap kemarau daripada dua kabupaten lainnya.",
        },
        {
          column: 1,
          label:
            "Pada tahun El Nino, penurunan produksi dalam persen paling besar terjadi di kabupaten dengan irigasi teknis paling sempit.",
        },
        {
          column: 2,
          label:
            "Petani Banyulor menanam lebih sedikit pada 2023 karena takut gagal panen.",
        },
        {
          column: 2,
          label:
            "Pada 2022, produksi Sukamaju lebih dari separuh produksi ketiga kabupaten bersama-sama.",
        },
      ],
    },
  },
};

export default item;
