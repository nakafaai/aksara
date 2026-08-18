import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Imports rise and fall from year to year.", value: false },
    {
      label:
        "Production, consumption, and imports rise by the same amount each year.",
      value: false,
    },
    { label: "The highest consumption occurs in year A.", value: false },
    {
      label:
        "Consumption exceeds domestic production in every listed year, and imports cover the gap.",
      value: true,
    },
    {
      label: "Imports exceed domestic production in every listed year.",
      value: false,
    },
  ],
  id: [
    { label: "Impor naik dan turun dari tahun ke tahun.", value: false },
    {
      label:
        "Produksi, konsumsi, dan impor bertambah dengan jumlah yang sama setiap tahun.",
      value: false,
    },
    { label: "Konsumsi tertinggi terjadi pada tahun A.", value: false },
    {
      label:
        "Konsumsi melebihi produksi dalam negeri pada setiap tahun yang tercantum, dan impor menutup selisihnya.",
      value: true,
    },
    {
      label:
        "Impor melebihi produksi dalam negeri pada setiap tahun yang tercantum.",
      value: false,
    },
  ],
};

export default choices;
