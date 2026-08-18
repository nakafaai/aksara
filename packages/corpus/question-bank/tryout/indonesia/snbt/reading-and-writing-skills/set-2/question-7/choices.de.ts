import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "tritt auf, wenn.",
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
      label: "außer wenn.",
      value: false,
    },
    {
      label: "nachdem.",
      value: false,
    },
  ],
};

export default choices;
