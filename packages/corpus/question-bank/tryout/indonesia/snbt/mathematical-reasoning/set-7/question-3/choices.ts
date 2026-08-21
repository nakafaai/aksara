import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Notizbücher",
      value: false,
    },
    {
      label: "Kugelschreiber",
      value: false,
    },
    {
      label: "Bleistifte",
      value: true,
    },
    {
      label: "Notizbücher und Bleistifte",
      value: false,
    },
    {
      label: "Alle bringen den gleichen Gewinn",
      value: false,
    },
  ],
  en: [
    { label: "Notebooks", value: false },
    { label: "Ballpoints", value: false },
    { label: "Pencils", value: true },
    { label: "Notebooks and Pencils", value: false },
    { label: "All give equal profit", value: false },
  ],
  id: [
    { label: "Buku tulis", value: false },
    { label: "Bolpoin", value: false },
    { label: "Pensil", value: true },
    { label: "Buku tulis dan Pensil", value: false },
    { label: "Semua memberikan keuntungan sama", value: false },
  ],
};

export default choices;
