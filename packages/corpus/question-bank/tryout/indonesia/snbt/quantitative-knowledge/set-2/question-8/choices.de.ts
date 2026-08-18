import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Wahr, wahr, wahr",
      value: false,
    },
    {
      label: "Wahr, wahr, falsch",
      value: true,
    },
    {
      label: "Wahr, falsch, falsch",
      value: false,
    },
    {
      label: "Falsch, wahr, wahr",
      value: false,
    },
    {
      label: "Falsch, falsch, wahr",
      value: false,
    },
  ],
};

export default choices;
