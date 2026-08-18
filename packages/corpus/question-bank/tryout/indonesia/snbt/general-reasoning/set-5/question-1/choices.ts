import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "More consumers choose chicken eggs", value: false },
    { label: "The price rises again the following week", value: false },
    { label: "Several distribution routes remain disrupted", value: false },
    {
      label: "Egg production falls while demand continues to rise",
      value: false,
    },
    {
      label:
        "Egg output and deliveries increase enough to meet the extra demand",
      value: true,
    },
  ],
  id: [
    { label: "Semakin banyak konsumen memilih telur ayam", value: false },
    { label: "Harga kembali naik pada pekan berikutnya", value: false },
    { label: "Beberapa jalur distribusi masih tersendat", value: false },
    {
      label: "Produksi telur turun sementara permintaan terus meningkat",
      value: false,
    },
    {
      label:
        "Produksi dan pengiriman telur meningkat hingga cukup memenuhi tambahan permintaan",
      value: true,
    },
  ],
};

export default choices;
