import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2x^2 + 8x - 11$$",
      value: true,
    },
    {
      label: "$$2x^2 + 8x - 6$$",
      value: false,
    },
    {
      label: "$$2x^2 + 8x - 9$$",
      value: false,
    },
    {
      label: "$$2x^2 + 4x - 6$$",
      value: false,
    },
    {
      label: "$$2x^2 + 4x - 9$$",
      value: false,
    },
  ],
};

export default choices;
