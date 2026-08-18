import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Every participant chose tea with added sugar.", value: false },
    {
      label: "Every tea drinker added sugar.",
      value: false,
    },
    {
      label: "No participant drank tea without added sugar.",
      value: false,
    },
    {
      label: "At least one participant drank tea without added sugar.",
      value: true,
    },
    { label: "Every participant who chose a drink chose tea.", value: false },
  ],
  id: [
    {
      label: "Setiap peserta memilih teh dengan tambahan gula.",
      value: false,
    },
    {
      label: "Setiap peminum teh menambahkan gula.",
      value: false,
    },
    {
      label: "Tidak ada peserta yang meminum teh tanpa tambahan gula.",
      value: false,
    },
    {
      label: "Sekurang-kurangnya satu peserta meminum teh tanpa tambahan gula.",
      value: true,
    },
    { label: "Setiap peserta yang memilih minuman memilih teh.", value: false },
  ],
};

export default choices;
