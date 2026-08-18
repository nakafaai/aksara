import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Semua benda plastik yang diproduksi di daratan",
      value: false,
    },
    {
      label:
        "Sampah yang masuk ke laut melalui sungai atau langsung dari pesisir",
      value: true,
    },
    {
      label: "Sampah yang terdampar kembali di daratan suatu negara",
      value: false,
    },
    {
      label: "Semua sampah nonorganik yang ditemukan di laut",
      value: false,
    },
    {
      label: "Sampah yang tidak dapat terurai secara alami",
      value: false,
    },
  ],
};

export default choices;
