import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$y = 2x + 6$$",
      value: false,
    },
    {
      label: "$$y = 2x - 6$$",
      value: false,
    },
    {
      label: "$$y = x + 12$$",
      value: false,
    },
    {
      label: "$$y = x + 9$$",
      value: true,
    },
    {
      label: "$$y = x - 9$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$y = 2x + 6$$",
      value: false,
    },
    {
      label: "$$y = 2x - 6$$",
      value: false,
    },
    {
      label: "$$y = x + 12$$",
      value: false,
    },
    {
      label: "$$y = x + 9$$",
      value: true,
    },
    {
      label: "$$y = x - 9$$",
      value: false,
    },
  ],
};

export default choices;
