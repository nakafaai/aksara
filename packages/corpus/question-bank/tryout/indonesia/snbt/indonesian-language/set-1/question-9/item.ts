import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Semua benda plastik yang diproduksi di daratan",
        },
        {
          isCorrect: false,
          label: "Sampah yang terdampar kembali di daratan suatu negara",
        },
        {
          isCorrect: false,
          label: "Semua sampah nonorganik yang ditemukan di laut",
        },
        {
          isCorrect: true,
          label:
            "Sampah yang masuk ke laut melalui sungai atau langsung dari pesisir",
        },
        {
          isCorrect: false,
          label: "Sampah yang tidak dapat terurai secara alami",
        },
      ],
    },
  },
};

export default item;
