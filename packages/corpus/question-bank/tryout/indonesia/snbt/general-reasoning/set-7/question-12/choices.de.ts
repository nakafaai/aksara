import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1{,}75\\text{ Meter}$$",
      value: false,
    },
    {
      label: "$$1{,}85\\text{ Meter}$$",
      value: false,
    },
    {
      label: "$$1{,}90\\text{ Meter}$$",
      value: false,
    },
    {
      label: "$$2{,}00\\text{ Meter}$$",
      value: true,
    },
    {
      label: "$$2{,}10\\text{ Meter}$$",
      value: false,
    },
  ],
};

export default choices;
