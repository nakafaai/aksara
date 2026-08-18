import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$\\{x < 0 \\text{ oder } x < 1, x \\in \\mathbb{R}\\}$$",
      value: false,
    },
    {
      label: "$$\\{x < 0 \\text{ oder } x > 1, x \\in \\mathbb{R}\\}$$",
      value: true,
    },
    {
      label: "$$\\{x > 0 \\text{ oder } x > 1, x \\in \\mathbb{R}\\}$$",
      value: false,
    },
    {
      label: "$$\\{0 < x < 1, x \\in \\mathbb{R}\\}$$",
      value: false,
    },
    {
      label: "$$\\{-1 < x < 1, x \\in \\mathbb{R}\\}$$",
      value: false,
    },
  ],
};

export default choices;
