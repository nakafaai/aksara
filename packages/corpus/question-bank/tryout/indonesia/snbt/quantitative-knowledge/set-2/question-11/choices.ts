import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

// Date: 2025-11-22
const choices: QuestionChoices = {
  en: [
    {
      label: "$$x \\in [2, 5) \\cup [5, 8)$$",
      value: false,
    },
    {
      label: "$$x \\in [0, 2) \\cup [5, 10)$$",
      value: false,
    },
    {
      label: "$$x \\in [2, 8)$$",
      value: false,
    },
    {
      label: "$$x \\in [5, 10)$$",
      value: false,
    },
    {
      label: "$$x \\in [2, 10)$$",
      value: true,
    },
  ],
  id: [
    {
      label: "$$x \\in [2, 5) \\cup [5, 8)$$",
      value: false,
    },
    {
      label: "$$x \\in [0, 2) \\cup [5, 10)$$",
      value: false,
    },
    {
      label: "$$x \\in [2, 8)$$",
      value: false,
    },
    {
      label: "$$x \\in [5, 10)$$",
      value: false,
    },
    {
      label: "$$x \\in [2, 10)$$",
      value: true,
    },
  ],
};

export default choices;
