import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "No value satisfies",
      value: true,
    },
    {
      label:
        "$$\\left\\{k \\in \\mathbb{R} \\mid k < \\frac{-3 - \\sqrt{13}}{2} \\text{ or } k > \\frac{-3 + \\sqrt{13}}{2}\\right\\}$$",
      value: false,
    },
    {
      label: "$$\\{k \\in \\mathbb{R} \\mid k > -1\\}$$",
      value: false,
    },
    {
      label: "$$\\{-4, \\frac{1}{2}\\}$$",
      value: false,
    },
    {
      label: "$$\\left\\{\\frac{1}{2}\\right\\}$$",
      value: false,
    },
  ],
  id: [
    {
      label: "Tidak ada nilai yang memenuhi",
      value: true,
    },
    {
      label:
        "$$\\left\\{k \\in \\mathbb{R} \\mid k < \\frac{-3 - \\sqrt{13}}{2} \\text{ atau } k > \\frac{-3 + \\sqrt{13}}{2}\\right\\}$$",
      value: false,
    },
    {
      label: "$$\\{k \\in \\mathbb{R} \\mid k > -1\\}$$",
      value: false,
    },
    {
      label: "$$\\{-4, \\frac{1}{2}\\}$$",
      value: false,
    },
    {
      label: "$$\\left\\{\\frac{1}{2}\\right\\}$$",
      value: false,
    },
  ],
};

export default choices;
