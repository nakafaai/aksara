import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$\\frac{1}{2^{11}}$$",
      value: false,
    },
    {
      label: "$$\\frac{1}{2^{12}}$$",
      value: false,
    },
    {
      label: "$$\\frac{3}{2^{11}}$$",
      value: false,
    },
    {
      label: "$$\\frac{3}{2^{12}}$$",
      value: true,
    },
    {
      label: "$$\\frac{1}{2^{11}} + \\frac{1}{3^{11}}$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$\\frac{1}{2^{11}}$$",
      value: false,
    },
    {
      label: "$$\\frac{1}{2^{12}}$$",
      value: false,
    },
    {
      label: "$$\\frac{3}{2^{11}}$$",
      value: false,
    },
    {
      label: "$$\\frac{3}{2^{12}}$$",
      value: true,
    },
    {
      label: "$$\\frac{1}{2^{11}} + \\frac{1}{3^{11}}$$",
      value: false,
    },
  ],
};

export default choices;
