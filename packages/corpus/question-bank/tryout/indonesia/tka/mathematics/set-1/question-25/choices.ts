import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$x - y + 4 = 0$$",
      value: false,
    },
    {
      label: "$$x - y - 8 = 0$$",
      value: false,
    },
    {
      label: "$$x - y + 8 = 0$$",
      value: true,
    },
    {
      label: "$$2x - y + 8 = 0$$",
      value: false,
    },
    {
      label: "$$2x - y - 8 = 0$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$x - y + 4 = 0$$",
      value: false,
    },
    {
      label: "$$x - y - 8 = 0$$",
      value: false,
    },
    {
      label: "$$x - y + 8 = 0$$",
      value: true,
    },
    {
      label: "$$2x - y + 8 = 0$$",
      value: false,
    },
    {
      label: "$$2x - y - 8 = 0$$",
      value: false,
    },
  ],
};

export default choices;
