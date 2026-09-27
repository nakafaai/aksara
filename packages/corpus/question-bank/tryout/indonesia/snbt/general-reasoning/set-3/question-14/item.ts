import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Penjualan bawang putih pada bulan Januari $$2021$$ akan melebihi $$100$$ ton.",
        },
        {
          isCorrect: false,
          label:
            "Setiap jenis rempah mencapai penjualan tertinggi pada November $$2020$$.",
        },
        {
          isCorrect: false,
          label:
            "Penjualan bawang merah pada bulan Januari $$2021$$ diprediksi sebesar $$76$$ ton.",
        },
        {
          isCorrect: false,
          label:
            "Penjualan bawang merah lebih rendah daripada penjualan cabai merah pada setiap bulan.",
        },
        {
          isCorrect: false,
          label:
            "Bawang merah menjadi satu-satunya rempah dengan penjualan terendah pada setiap bulan.",
        },
      ],
    },
  },
};

export default item;
