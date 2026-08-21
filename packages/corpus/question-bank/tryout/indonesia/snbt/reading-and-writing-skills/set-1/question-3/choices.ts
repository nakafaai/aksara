import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Produkt.",
      value: false,
    },
    {
      label: "produktiv.",
      value: false,
    },
    {
      label: "Produktion.",
      value: false,
    },
    {
      label: "Produzent.",
      value: false,
    },
    {
      label: "Produktivität.",
      value: true,
    },
  ],
  en: [
    {
      label: "product.",
      value: false,
    },
    {
      label: "productive.",
      value: false,
    },
    {
      label: "production.",
      value: false,
    },
    {
      label: "producer.",
      value: false,
    },
    {
      label: "productivity.",
      value: true,
    },
  ],
  id: [
    {
      label: "produk.",
      value: false,
    },
    {
      label: "produktif.",
      value: false,
    },
    {
      label: "produksi.",
      value: false,
    },
    {
      label: "produsen.",
      value: false,
    },
    {
      label: "produktivitas.",
      value: true,
    },
  ],
};

export default choices;
