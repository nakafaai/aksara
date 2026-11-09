import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tahapan pembuatan motif batik Lasem",
        },
        {
          correct: true,
          label: "Langkah konkret untuk menyimpan dan melindungi arsip asli",
        },
        {
          correct: false,
          label: "Biografi seluruh pedagang batik dalam arsip",
        },
        {
          correct: false,
          label: "Sejarah pendirian setiap museum di Rembang",
        },
        {
          correct: false,
          label: "Perbandingan harga batik lama dan masa kini",
        },
      ],
    },
  },
};

export default item;
