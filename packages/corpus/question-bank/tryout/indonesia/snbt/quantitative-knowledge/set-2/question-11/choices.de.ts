import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$x \\in [2, 5) \\cup [5, 8)$$",
      value: false,
    },
    {
      label: "$$x \\in [0, 2) \\cup [5, 10)$$",
      value: false,
    },
    {
      label: "$$x \\in [2, 8)$$",
      value: false,
    },
    {
      label: "$$x \\in [5, 10)$$",
      value: false,
    },
    {
      label: "$$x \\in [2, 10)$$",
      value: true,
    },
  ],
};

export default choices;
