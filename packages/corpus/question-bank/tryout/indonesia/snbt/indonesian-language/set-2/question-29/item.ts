import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Langkah konkret untuk menyimpan dan melindungi arsip asli",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tahapan pembuatan motif batik Lasem" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Biografi seluruh pedagang batik dalam arsip",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sejarah pendirian setiap museum di Rembang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perbandingan harga batik lama dan masa kini",
            },
          ],
        },
      ],
    },
  },
};

export default item;
