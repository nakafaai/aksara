import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "weil.",
      value: true,
    },
    {
      label: "obwohl.",
      value: false,
    },
    {
      label: "damit.",
      value: false,
    },
    {
      label: "sofern nicht.",
      value: false,
    },
    {
      label: "nachdem.",
      value: false,
    },
  ],
};

export default choices;
