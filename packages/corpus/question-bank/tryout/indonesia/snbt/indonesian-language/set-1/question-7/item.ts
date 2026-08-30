import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Daftar seluruh produk plastik yang dibuat di Indonesia",
        },
        {
          isCorrect: true,
          label:
            "Langkah pengurangan sampah melalui kerja sama daratan, pelayaran, perikanan, dan negara-negara terkait",
        },
        {
          isCorrect: false,
          label: "Sejarah terbentuknya kepulauan Seychelles",
        },
        {
          isCorrect: false,
          label:
            "Cara menentukan kewarganegaraan setiap benda plastik yang ditemukan",
        },
        {
          isCorrect: false,
          label: "Perbandingan jumlah penduduk Indonesia dan Seychelles",
        },
      ],
    },
  },
};

export default item;
