import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tahapan pembuatan motif batik Lasem",
        },
        {
          isCorrect: true,
          label: "Langkah konkret untuk menyimpan dan melindungi arsip asli",
        },
        {
          isCorrect: false,
          label: "Biografi seluruh pedagang batik dalam arsip",
        },
        {
          isCorrect: false,
          label: "Sejarah pendirian setiap museum di Rembang",
        },
        {
          isCorrect: false,
          label: "Perbandingan harga batik lama dan masa kini",
        },
      ],
    },
  },
};

export default item;
