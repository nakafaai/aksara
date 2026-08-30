import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Daftar seluruh produk plastik yang dibuat di Indonesia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sejarah terbentuknya kepulauan Seychelles" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Cara menentukan kewarganegaraan setiap benda plastik yang ditemukan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Langkah pengurangan sampah melalui kerja sama daratan, pelayaran, perikanan, dan negara-negara terkait",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perbandingan jumlah penduduk Indonesia dan Seychelles",
            },
          ],
        },
      ],
    },
  },
};

export default item;
