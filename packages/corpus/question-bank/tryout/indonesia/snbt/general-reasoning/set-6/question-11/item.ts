import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Konsumsi melebihi produksi dalam negeri pada setiap tahun yang tercantum, dan impor menutup selisihnya.",
        },
        {
          isCorrect: false,
          label: "Impor naik dan turun dari tahun ke tahun.",
        },
        {
          isCorrect: false,
          label:
            "Produksi, konsumsi, dan impor bertambah dengan jumlah yang sama setiap tahun.",
        },
        {
          isCorrect: false,
          label: "Konsumsi tertinggi terjadi pada tahun A.",
        },
        {
          isCorrect: false,
          label:
            "Impor melebihi produksi dalam negeri pada setiap tahun yang tercantum.",
        },
      ],
    },
  },
};

export default item;
