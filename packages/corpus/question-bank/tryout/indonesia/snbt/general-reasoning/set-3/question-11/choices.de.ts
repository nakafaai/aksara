import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "definitiv wahr",
      value: false,
    },
    {
      label: "möglicherweise wahr",
      value: true,
    },
    {
      label: "definitiv falsch",
      value: false,
    },
    {
      label: "möglicherweise falsch",
      value: false,
    },
    {
      label: "kann nicht bestimmt werden",
      value: false,
    },
  ],
};

export default choices;
