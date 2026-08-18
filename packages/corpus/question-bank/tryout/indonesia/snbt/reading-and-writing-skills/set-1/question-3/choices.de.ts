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
};

export default choices;
