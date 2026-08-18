import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$-9x^2 + 30x + 30$$",
      value: false,
    },
    {
      label: "$$-9x^2 + 30x - 20$$",
      value: true,
    },
    {
      label: "$$-9x^2 - 30x - 20$$",
      value: false,
    },
    {
      label: "$$-9x^2 + 30$$",
      value: false,
    },
    {
      label: "$$-9x^2 - 20$$",
      value: false,
    },
  ],
};

export default choices;
