import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Dagegen",
      value: false,
    },
    {
      label: "Außerdem",
      value: true,
    },
    {
      label: "Deshalb",
      value: false,
    },
    {
      label: "Dennoch",
      value: false,
    },
    {
      label: "Zum Beispiel",
      value: false,
    },
  ],
};

export default choices;
