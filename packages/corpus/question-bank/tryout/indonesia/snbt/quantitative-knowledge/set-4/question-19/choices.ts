import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2{,}5$$ Liter",
      value: false,
    },
    {
      label: "$$5$$ Liter",
      value: false,
    },
    {
      label: "$$7{,}5$$ Liter",
      value: false,
    },
    {
      label: "$$10$$ Liter",
      value: false,
    },
    {
      label: "$$12{,}5$$ Liter",
      value: true,
    },
  ],
  en: [
    {
      label: "$$2.5$$ liters",
      value: false,
    },
    {
      label: "$$5$$ liters",
      value: false,
    },
    {
      label: "$$7.5$$ liters",
      value: false,
    },
    {
      label: "$$10$$ liters",
      value: false,
    },
    {
      label: "$$12.5$$ liters",
      value: true,
    },
  ],
  id: [
    {
      label: "$$2{,}5$$ liter",
      value: false,
    },
    {
      label: "$$5$$ liter",
      value: false,
    },
    {
      label: "$$7{,}5$$ liter",
      value: false,
    },
    {
      label: "$$10$$ liter",
      value: false,
    },
    {
      label: "$$12{,}5$$ liter",
      value: true,
    },
  ],
};

export default choices;
