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
};

export default choices;
