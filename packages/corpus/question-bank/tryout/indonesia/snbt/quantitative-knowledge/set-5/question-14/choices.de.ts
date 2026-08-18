import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$-13x - y - 15 = 0$$",
      value: false,
    },
    {
      label: "$$13x - y - 15 = 0$$",
      value: false,
    },
    {
      label: "$$13x + y - 15 = 0$$",
      value: true,
    },
    {
      label: "$$-13x + y - 15 = 0$$",
      value: false,
    },
    {
      label: "$$13x + y - 37 = 0$$",
      value: false,
    },
  ],
};

export default choices;
