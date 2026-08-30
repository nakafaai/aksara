import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jedes Gewürz erreicht seinen höchsten Verkaufswert im November $$2020$$.",
        },
        {
          isCorrect: false,
          label:
            "Die Schalottenverkäufe im Januar $$2021$$ werden voraussichtlich $$76$$ Tonnen betragen.",
        },
        {
          isCorrect: true,
          label:
            "Der Knoblauchabsatz im Januar $$2021$$ wird $$100$$ Tonnen übersteigen.",
        },
        {
          isCorrect: false,
          label:
            "In jedem Monat werden weniger Schalotten als rote Chilischoten verkauft.",
        },
        {
          isCorrect: false,
          label:
            "Schalotten sind in jedem Monat allein das Gewürz mit dem niedrigsten Verkaufswert.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Each spice recorded its highest sales in November $$2020$$.",
        },
        {
          isCorrect: false,
          label:
            "Shallot sales in January $$2021$$ are predicted to be $$76$$ tons.",
        },
        {
          isCorrect: true,
          label: "Garlic sales in January $$2021$$ will exceed $$100$$ tons.",
        },
        {
          isCorrect: false,
          label: "Shallot sales are lower than red chili sales in every month.",
        },
        {
          isCorrect: false,
          label: "Shallot is the sole lowest-selling spice in every month.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Penjualan bawang putih pada bulan Januari $$2021$$ akan melebihi $$100$$ ton.",
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
