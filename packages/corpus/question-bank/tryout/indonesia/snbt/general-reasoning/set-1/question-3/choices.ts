import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "FOLU had a lower value than energy in the 2010 baseline.",
      value: false,
    },
    {
      label: "Agriculture had the highest value in the 2030 projection.",
      value: false,
    },
    {
      label: "The same sector had the highest value at both reference points.",
      value: false,
    },
    {
      label:
        "Energy and FOLU were the two largest values at both reference points, although their order changed.",
      value: true,
    },
    {
      label:
        "Waste and industrial processes together exceeded energy in the 2010 baseline.",
      value: false,
    },
  ],
  id: [
    {
      label: "Nilai FOLU lebih rendah daripada energi pada tahun dasar 2010.",
      value: false,
    },
    {
      label: "Sektor pertanian memiliki nilai tertinggi pada proyeksi 2030.",
      value: false,
    },
    {
      label: "Sektor yang sama memiliki nilai tertinggi pada kedua acuan.",
      value: false,
    },
    {
      label:
        "Energi dan FOLU merupakan dua nilai terbesar pada kedua acuan, meskipun urutannya berubah.",
      value: true,
    },
    {
      label:
        "Gabungan sektor limbah dan proses industri melampaui energi pada tahun dasar 2010.",
      value: false,
    },
  ],
};

export default choices;
