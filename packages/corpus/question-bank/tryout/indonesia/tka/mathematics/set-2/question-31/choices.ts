import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$\\frac{-f(-1)}{2}(1 + x)$$",
      value: false,
    },
    {
      label: "$$\\frac{-f(-1)}{2}(1 - x)$$",
      value: false,
    },
    {
      label: "$$\\frac{f(-1)}{2}(1 + x)$$",
      value: false,
    },
    {
      label: "$$\\frac{f(-1)}{2}(1 - x)$$",
      value: true,
    },
    {
      label: "$$\\frac{f(-1)}{2}(x - 1)$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$\\frac{-f(-1)}{2}(1 + x)$$",
      value: false,
    },
    {
      label: "$$\\frac{-f(-1)}{2}(1 - x)$$",
      value: false,
    },
    {
      label: "$$\\frac{f(-1)}{2}(1 + x)$$",
      value: false,
    },
    {
      label: "$$\\frac{f(-1)}{2}(1 - x)$$",
      value: true,
    },
    {
      label: "$$\\frac{f(-1)}{2}(x - 1)$$",
      value: false,
    },
  ],
};

export default choices;
