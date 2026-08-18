import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$0 \\leq x \\leq 30$$",
      value: false,
    },
    {
      label: "$$30 \\leq x \\leq 35$$",
      value: false,
    },
    {
      label: "$$30 \\leq x \\leq 40$$",
      value: true,
    },
    {
      label: "$$20 \\leq x \\leq 30$$",
      value: false,
    },
    {
      label: "Kann nicht bestimmt werden",
      value: false,
    },
  ],
};

export default choices;
