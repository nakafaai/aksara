import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$y = -x + 1$$",
      value: false,
    },
    {
      label: "$$y = x + 1$$",
      value: true,
    },
    {
      label: "$$y = 2x - 1$$",
      value: false,
    },
    {
      label: "$$y = 2x + 1$$",
      value: false,
    },
    {
      label: "$$y = 2x + 2$$",
      value: false,
    },
  ],
};

export default choices;
