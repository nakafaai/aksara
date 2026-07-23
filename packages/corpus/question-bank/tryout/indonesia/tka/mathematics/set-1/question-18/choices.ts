import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$\\left\\{0, \\frac{1}{2}\\pi, \\pi\\right\\}$$",
      value: false,
    },
    {
      label: "$$\\left\\{0, \\frac{1}{2}\\pi, \\frac{2}{3}\\pi\\right\\}$$",
      value: false,
    },
    {
      label:
        "$$\\left\\{0, \\frac{1}{2}\\pi, \\pi, \\frac{3}{2}\\pi\\right\\}$$",
      value: false,
    },
    {
      label:
        "$$\\left\\{0, \\frac{1}{2}\\pi, \\frac{2}{3}\\pi, 2\\pi\\right\\}$$",
      value: false,
    },
    {
      label:
        "$$\\left\\{0, \\frac{1}{2}\\pi, \\frac{3}{2}\\pi, 2\\pi\\right\\}$$",
      value: true,
    },
  ],
  id: [
    {
      label: "$$\\left\\{0, \\frac{1}{2}\\pi, \\pi\\right\\}$$",
      value: false,
    },
    {
      label: "$$\\left\\{0, \\frac{1}{2}\\pi, \\frac{2}{3}\\pi\\right\\}$$",
      value: false,
    },
    {
      label:
        "$$\\left\\{0, \\frac{1}{2}\\pi, \\pi, \\frac{3}{2}\\pi\\right\\}$$",
      value: false,
    },
    {
      label:
        "$$\\left\\{0, \\frac{1}{2}\\pi, \\frac{2}{3}\\pi, 2\\pi\\right\\}$$",
      value: false,
    },
    {
      label:
        "$$\\left\\{0, \\frac{1}{2}\\pi, \\frac{3}{2}\\pi, 2\\pi\\right\\}$$",
      value: true,
    },
  ],
};

export default choices;
