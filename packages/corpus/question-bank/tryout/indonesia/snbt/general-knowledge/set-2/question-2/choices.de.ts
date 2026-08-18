import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "jedoch.",
      value: false,
    },
    {
      label: "obwohl.",
      value: false,
    },
    {
      label: "während.",
      value: false,
    },
    {
      label: "sondern.",
      value: true,
    },
    {
      label: "vielmehr.",
      value: false,
    },
  ],
};

export default choices;
