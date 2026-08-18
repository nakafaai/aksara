import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Es war der Anteil des Gesamtbudgets, der für landwirtschaftliche Produktionsmittel und Infrastruktur ausgegeben wurde.",
      value: true,
    },
    {
      label:
        "Es war der Anteil des Budgets, der für andere Aufgaben des Ministeriums übrig blieb.",
      value: false,
    },
    {
      label: "Es war der gemeldete Anstieg der Reisproduktion.",
      value: false,
    },
    {
      label: "Es war der gemeldete Anstieg der Maisproduktion.",
      value: false,
    },
    {
      label:
        "Es war der Anteil des Budgets, der ausschließlich zur Regelung von Importen diente.",
      value: false,
    },
  ],
};

export default choices;
