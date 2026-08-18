import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$41\\text{ Stunden }15\\text{ Minuten}$$",
      value: true,
    },
    {
      label: "$$41\\text{ Stunden }25\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$42\\text{ Stunden }15\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$42\\text{ Stunden }25\\text{ Minuten}$$",
      value: false,
    },
    {
      label: "$$42\\text{ Stunden }45\\text{ Minuten}$$",
      value: false,
    },
  ],
};

export default choices;
