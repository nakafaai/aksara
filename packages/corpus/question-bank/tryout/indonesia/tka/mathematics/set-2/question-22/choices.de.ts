import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$\\{x \\in R: -3 \\leq x \\leq 3\\}$$",
      value: false,
    },
    {
      label: "$$\\{x \\in R: -3 \\leq x \\leq 2\\}$$",
      value: true,
    },
    {
      label: "$$\\{x \\in R: x \\leq -3 \\text{ oder } x \\geq 2\\}$$",
      value: false,
    },
    {
      label: "$$\\{x \\in R: 0 \\leq x \\leq 2\\}$$",
      value: false,
    },
    {
      label: "$$R$$",
      value: false,
    },
  ],
};

export default choices;
