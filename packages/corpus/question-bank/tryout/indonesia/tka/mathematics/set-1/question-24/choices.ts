import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$P(Z < 1) - P(Z < -1)$$",
      value: true,
    },
    {
      label: "$$P(Z < 2) - P(Z < -2)$$",
      value: false,
    },
    {
      label: "$$P(Z < 1) + P(Z < -1)$$",
      value: false,
    },
    {
      label: "$$P(Z < 2) + P(Z < -2)$$",
      value: false,
    },
    {
      label: "$$P(Z < 0) - P(Z < -1)$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$P(Z < 1) - P(Z < -1)$$",
      value: true,
    },
    {
      label: "$$P(Z < 2) - P(Z < -2)$$",
      value: false,
    },
    {
      label: "$$P(Z < 1) + P(Z < -1)$$",
      value: false,
    },
    {
      label: "$$P(Z < 2) + P(Z < -2)$$",
      value: false,
    },
    {
      label: "$$P(Z < 0) - P(Z < -1)$$",
      value: false,
    },
  ],
};

export default choices;
