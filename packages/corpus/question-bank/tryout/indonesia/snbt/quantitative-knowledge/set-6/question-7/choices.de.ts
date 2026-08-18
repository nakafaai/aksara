import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$5 \\text{ und } -3$$",
      value: false,
    },
    {
      label: "$$-5 \\text{ und } 3$$",
      value: false,
    },
    {
      label: "$$\\frac{5}{3} \\text{ und } -1$$",
      value: true,
    },
    {
      label: "$$-\\frac{5}{3} \\text{ und } 1$$",
      value: false,
    },
    {
      label: "$$5 \\text{ und } -1$$",
      value: false,
    },
  ],
};

export default choices;
