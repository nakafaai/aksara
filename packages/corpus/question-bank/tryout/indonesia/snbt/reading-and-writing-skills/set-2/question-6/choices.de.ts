import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "oft.",
      value: true,
    },
    {
      label: "selten.",
      value: false,
    },
    {
      label: "plötzlich.",
      value: false,
    },
    {
      label: "getrennt.",
      value: false,
    },
    {
      label: "vielleicht.",
      value: false,
    },
  ],
};

export default choices;
