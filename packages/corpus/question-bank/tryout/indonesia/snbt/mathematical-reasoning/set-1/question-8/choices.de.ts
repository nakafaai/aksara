import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$x - 5$$",
      value: false,
    },
    {
      label: "$$x + 5$$",
      value: false,
    },
    {
      label: "$$5 - x$$",
      value: true,
    },
    {
      label: "$$5 - 2x$$",
      value: false,
    },
    {
      label: "$$2x - 5$$",
      value: false,
    },
  ],
};

export default choices;
