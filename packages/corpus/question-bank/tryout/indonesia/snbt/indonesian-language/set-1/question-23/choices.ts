import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Kesiapan persenjataan",
      value: false,
    },
    {
      label: "Perlindungan terhadap pemimpin",
      value: false,
    },
    {
      label: "Jumlah tentara yang tersedia",
      value: false,
    },
    {
      label: "Ketersediaan rumah sakit dan obat-obatan",
      value: false,
    },
    {
      label: "Biaya dan dampak perang",
      value: true,
    },
  ],
};

export default choices;
