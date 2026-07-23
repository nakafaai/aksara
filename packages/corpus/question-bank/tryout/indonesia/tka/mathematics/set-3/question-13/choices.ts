import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$-1$$",
      value: false,
    },
    {
      label: "$$1$$",
      value: false,
    },
    {
      label: "$$0$$",
      value: false,
    },
    {
      label: "$$y$$",
      value: true,
    },
    {
      label: "$$-y$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$-1$$",
      value: false,
    },
    {
      label: "$$1$$",
      value: false,
    },
    {
      label: "$$0$$",
      value: false,
    },
    {
      label: "$$y$$",
      value: true,
    },
    {
      label: "$$-y$$",
      value: false,
    },
  ],
};

export default choices;
