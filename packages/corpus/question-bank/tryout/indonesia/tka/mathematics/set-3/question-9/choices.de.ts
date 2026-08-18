import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$0$$",
      value: false,
    },
    {
      label: "$$\\frac{2}{27}$$",
      value: false,
    },
    {
      label: "$$-\\frac{2}{27}$$",
      value: true,
    },
    {
      label: "$$\\frac{1}{27}$$",
      value: false,
    },
    {
      label: "$$-\\frac{1}{27}$$",
      value: false,
    },
  ],
};

export default choices;
