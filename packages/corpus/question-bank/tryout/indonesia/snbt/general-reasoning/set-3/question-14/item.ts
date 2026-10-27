import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Penjualan bawang putih pada bulan Januari $$2021$$ akan melebihi $$100$$ ton.",
        },
        {
          correct: false,
          label:
            "Setiap jenis rempah mencapai penjualan tertinggi pada November $$2020$$.",
        },
        {
          correct: false,
          label:
            "Penjualan bawang merah pada bulan Januari $$2021$$ diprediksi sebesar $$76$$ ton.",
        },
        {
          correct: false,
          label:
            "Penjualan bawang merah lebih rendah daripada penjualan cabai merah pada setiap bulan.",
        },
        {
          correct: false,
          label:
            "Bawang merah menjadi satu-satunya rempah dengan penjualan terendah pada setiap bulan.",
        },
      ],
    },
  },
};

export default item;
