import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$(3,4) \\cup [6,7)$$",
      value: false,
    },
    {
      label: "$$(3,4) \\cup (6,7)$$",
      value: true,
    },
    {
      label: "$$(1,2) \\cup (3,4]$$",
      value: false,
    },
    {
      label: "$$(-\\infty, 1) \\cup [6,\\infty)$$",
      value: false,
    },
    {
      label: "$$(-\\infty, 2) \\cup (3,7)$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$(3,4) \\cup [6,7)$$",
      value: false,
    },
    {
      label: "$$(3,4) \\cup (6,7)$$",
      value: true,
    },
    {
      label: "$$(1,2) \\cup (3,4]$$",
      value: false,
    },
    {
      label: "$$(-\\infty, 1) \\cup [6,\\infty)$$",
      value: false,
    },
    {
      label: "$$(-\\infty, 2) \\cup (3,7)$$",
      value: false,
    },
  ],
};

export default choices;
