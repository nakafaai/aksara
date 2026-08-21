import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Huhn",
      value: false,
    },
    {
      label: "Rindfleisch",
      value: false,
    },
    {
      label: "Kaninchen",
      value: false,
    },
    {
      label: "Lamm",
      value: true,
    },
    {
      label: "Ente",
      value: false,
    },
  ],
  en: [
    { label: "Chicken", value: false },
    { label: "Beef", value: false },
    { label: "Rabbit", value: false },
    { label: "Lamb", value: true },
    { label: "Duck", value: false },
  ],
  id: [
    { label: "Ayam", value: false },
    { label: "Sapi", value: false },
    { label: "Kelinci", value: false },
    { label: "Domba", value: true },
    { label: "Bebek", value: false },
  ],
};

export default choices;
