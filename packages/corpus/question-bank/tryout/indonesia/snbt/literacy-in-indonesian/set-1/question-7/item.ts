import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Daftar seluruh produk plastik yang dibuat di Indonesia",
        },
        {
          correct: false,
          label: "Sejarah terbentuknya kepulauan Seychelles",
        },
        {
          correct: false,
          label:
            "Cara menentukan kewarganegaraan setiap benda plastik yang ditemukan",
        },
        {
          correct: true,
          label:
            "Langkah pengurangan sampah melalui kerja sama daratan, pelayaran, perikanan, dan negara-negara terkait",
        },
        {
          correct: false,
          label: "Perbandingan jumlah penduduk Indonesia dan Seychelles",
        },
      ],
    },
  },
};

export default item;
