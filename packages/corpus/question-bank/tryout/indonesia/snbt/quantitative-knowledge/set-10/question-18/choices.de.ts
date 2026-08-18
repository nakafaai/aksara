import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$\\{x | -3 \\leq x, x \\in \\text{ganze Zahlen}\\}$$",
      value: false,
    },
    {
      label: "$$\\{x | -3 < x, x \\in \\text{ganze Zahlen}\\}$$",
      value: false,
    },
    {
      label: "$$\\{x | x \\leq 7, x \\in \\text{ganze Zahlen}\\}$$",
      value: false,
    },
    {
      label: "$$\\{x | -3 < x \\leq 7, x \\in \\text{ganze Zahlen}\\}$$",
      value: true,
    },
    {
      label: "$$\\{x | -3 < x < 7, x \\in \\text{ganze Zahlen}\\}$$",
      value: false,
    },
  ],
};

export default choices;
