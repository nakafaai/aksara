import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$P > Q$$",
      value: false,
    },
    {
      label: "$$P < Q$$",
      value: true,
    },
    {
      label: "$$P = Q$$",
      value: false,
    },
    {
      label: "$$P + Q = 3$$",
      value: false,
    },
    {
      label: "Kann nicht ermittelt werden.",
      value: false,
    },
  ],
};

export default choices;
