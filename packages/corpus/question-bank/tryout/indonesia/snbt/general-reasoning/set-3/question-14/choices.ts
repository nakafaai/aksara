import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Each spice recorded its highest sales in November $$2020$$.",
      value: false,
    },
    {
      label:
        "Shallot sales in January $$2021$$ are predicted to be $$76$$ tons.",
      value: false,
    },
    {
      label: "Garlic sales in January $$2021$$ will exceed $$100$$ tons.",
      value: true,
    },
    {
      label: "Shallot sales are lower than red chili sales in every month.",
      value: false,
    },
    {
      label: "Shallot is the sole lowest-selling spice in every month.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Setiap jenis rempah mencapai penjualan tertinggi pada November $$2020$$.",
      value: false,
    },
    {
      label:
        "Penjualan bawang merah pada bulan Januari $$2021$$ diprediksi sebesar $$76$$ ton.",
      value: false,
    },
    {
      label:
        "Penjualan bawang putih pada bulan Januari $$2021$$ akan melebihi $$100$$ ton.",
      value: true,
    },
    {
      label:
        "Penjualan bawang merah lebih rendah daripada penjualan cabai merah pada setiap bulan.",
      value: false,
    },
    {
      label:
        "Bawang merah menjadi satu-satunya rempah dengan penjualan terendah pada setiap bulan.",
      value: false,
    },
  ],
};

export default choices;
