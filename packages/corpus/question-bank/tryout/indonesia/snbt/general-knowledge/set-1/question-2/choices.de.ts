import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "versorgt.",
      value: false,
    },
    {
      label: "aufgewacht.",
      value: false,
    },
    {
      label: "tief und fest schlafend.",
      value: true,
    },
    {
      label: "instand gehalten.",
      value: false,
    },
    {
      label: "geschützt.",
      value: false,
    },
  ],
};

export default choices;
