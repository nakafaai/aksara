import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1\\text{ Stunde }15\\text{ Minuten}$$",
      value: true,
    },
    {
      label: "$$1\\text{ Stunde }20\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$1\\text{ Stunde }25\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$2\\text{ Stunden }15\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$2\\text{ Stunden }20\\text{ Minuten}$$",
      value: false,
    },
  ],
};

export default choices;
