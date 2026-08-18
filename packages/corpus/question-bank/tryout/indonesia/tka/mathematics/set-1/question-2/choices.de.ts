import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$3 - \\sqrt{21}$$",
      value: false,
    },
    {
      label: "$$3 + \\sqrt{21}$$",
      value: false,
    },
    {
      label: "$$5 - \\sqrt{21}$$",
      value: false,
    },
    {
      label: "$$-5 + \\sqrt{21}$$",
      value: false,
    },
    {
      label: "$$-5 - \\sqrt{21}$$",
      value: true,
    },
  ],
};

export default choices;
