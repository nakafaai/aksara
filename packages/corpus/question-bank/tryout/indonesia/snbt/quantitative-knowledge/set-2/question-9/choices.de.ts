import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Wahr, wahr, wahr",
      value: false,
    },
    {
      label: "Wahr, wahr, falsch",
      value: false,
    },
    {
      label: "Falsch, wahr, falsch",
      value: true,
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
