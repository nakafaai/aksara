import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "aber.",
      value: true,
    },
    {
      label: "jedoch.",
      value: false,
    },
    {
      label: "das.",
      value: false,
    },
    {
      label: "also.",
      value: false,
    },
    {
      label: "weil.",
      value: false,
    },
  ],
};

export default choices;
