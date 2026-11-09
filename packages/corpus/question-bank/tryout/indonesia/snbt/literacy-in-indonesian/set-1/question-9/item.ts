import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua benda plastik yang diproduksi di daratan",
        },
        {
          correct: true,
          label:
            "Sampah yang masuk ke laut melalui sungai atau langsung dari pesisir",
        },
        {
          correct: false,
          label: "Sampah yang terdampar kembali di daratan suatu negara",
        },
        {
          correct: false,
          label: "Semua sampah nonorganik yang ditemukan di laut",
        },
        {
          correct: false,
          label: "Sampah yang tidak dapat terurai secara alami",
        },
      ],
    },
  },
};

export default item;
