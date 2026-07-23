import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$b < -\\frac{1}{2}$$",
      value: false,
    },
    {
      label: "$$-\\frac{1}{2} < b < 0$$",
      value: false,
    },
    {
      label: "$$b > -\\frac{1}{2}$$",
      value: true,
    },
    {
      label: "$$0 < b < \\frac{1}{2}$$",
      value: false,
    },
    {
      label: "$$b > 0$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$b < -\\frac{1}{2}$$",
      value: false,
    },
    {
      label: "$$-\\frac{1}{2} < b < 0$$",
      value: false,
    },
    {
      label: "$$b > -\\frac{1}{2}$$",
      value: true,
    },
    {
      label: "$$0 < b < \\frac{1}{2}$$",
      value: false,
    },
    {
      label: "$$b > 0$$",
      value: false,
    },
  ],
};

export default choices;
