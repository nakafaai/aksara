import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "verschlechtern.",
      value: false,
    },
    {
      label: "verursachen.",
      value: false,
    },
    {
      label: "fördern.",
      value: false,
    },
    {
      label: "verringern.",
      value: true,
    },
    {
      label: "beseitigen.",
      value: false,
    },
  ],
};

export default choices;
