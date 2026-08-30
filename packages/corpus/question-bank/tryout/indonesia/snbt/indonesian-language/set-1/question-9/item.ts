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
              text: "Semua benda plastik yang diproduksi di daratan",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sampah yang masuk ke laut melalui sungai atau langsung dari pesisir",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sampah yang terdampar kembali di daratan suatu negara",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua sampah nonorganik yang ditemukan di laut",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sampah yang tidak dapat terurai secara alami",
            },
          ],
        },
      ],
    },
  },
};

export default item;
