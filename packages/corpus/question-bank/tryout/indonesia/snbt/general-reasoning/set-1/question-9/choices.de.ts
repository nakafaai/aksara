import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$1\\text{ Stunde}$$",
      value: false,
    },
    {
      label: "$$1\\text{ Stunde} 30\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$2\\text{ Stunden}$$",
      value: false,
    },
    {
      label: "$$2\\text{ Stunden} 30\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$3\\text{ Stunden}$$",
      value: true,
    },
  ],
};

export default choices;
