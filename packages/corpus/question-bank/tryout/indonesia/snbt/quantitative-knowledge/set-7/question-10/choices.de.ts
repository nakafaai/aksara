import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$P > Q$$",
      value: true,
    },
    {
      label: "$$P < Q$$",
      value: false,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$PQ = 32$$",
      value: false,
    },
    {
      label: "Kann nicht bestimmt werden",
      value: false,
    },
  ],
};

export default choices;
