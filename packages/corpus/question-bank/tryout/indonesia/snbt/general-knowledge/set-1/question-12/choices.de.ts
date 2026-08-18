import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "eine Stellungnahme oder Erklärung abgeben.",
      value: true,
    },
    {
      label: "etwas bestreiten.",
      value: false,
    },
    {
      label: "über einen Preis verhandeln.",
      value: false,
    },
    {
      label: "über etwas reden.",
      value: false,
    },
    {
      label: "etwas besprechen.",
      value: false,
    },
  ],
};

export default choices;
