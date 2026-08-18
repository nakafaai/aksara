import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$250\\sqrt{3}\\text{ Meter}$$",
      value: true,
    },
    {
      label: "$$250\\sqrt{2}\\text{ Meter}$$",
      value: false,
    },
    {
      label: "$$500\\sqrt{3}\\text{ Meter}$$",
      value: false,
    },
    {
      label: "$$500\\sqrt{2}\\text{ Meter}$$",
      value: false,
    },
    {
      label: "$$250\\text{ Meter}$$",
      value: false,
    },
  ],
};

export default choices;
