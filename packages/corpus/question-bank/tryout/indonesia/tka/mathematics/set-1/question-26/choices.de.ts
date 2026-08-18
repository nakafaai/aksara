import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$30$$",
      value: false,
    },
    {
      label: "$$20$$",
      value: false,
    },
    {
      label: "$$12$$",
      value: false,
    },
    {
      label: "$$-12$$",
      value: false,
    },
    {
      label: "$$-30$$",
      value: true,
    },
  ],
};

export default choices;
