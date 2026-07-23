import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "slows down the digestion process",
      value: true,
    },
    {
      label: "inhibits stroke symptoms",
      value: false,
    },
    {
      label: "causes prolonged kidney disease",
      value: false,
    },
    {
      label: "reduces appetite",
      value: false,
    },
    {
      label: "causes food to be undigested by the body",
      value: false,
    },
  ],
  id: [
    {
      label: "memperlambat proses pencernaan",
      value: true,
    },
    {
      label: "menghambat gejala stroke",
      value: false,
    },
    {
      label: "mengalami penyakit ginjal dengan durasi yang lama",
      value: false,
    },
    {
      label: "mengurangi nafsu makan",
      value: false,
    },
    {
      label: "menyebabkan makanan tidak tercerna oleh tubuh",
      value: false,
    },
  ],
};

export default choices;
