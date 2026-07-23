import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$x < -2$$",
      value: false,
    },
    {
      label: "$$-5 < x < -2$$",
      value: true,
    },
    {
      label: "$$x > -5$$",
      value: false,
    },
    {
      label: "$$-5 < x < 1$$",
      value: false,
    },
    {
      label: "$$x > 1$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$x < -2$$",
      value: false,
    },
    {
      label: "$$-5 < x < -2$$",
      value: true,
    },
    {
      label: "$$x > -5$$",
      value: false,
    },
    {
      label: "$$-5 < x < 1$$",
      value: false,
    },
    {
      label: "$$x > 1$$",
      value: false,
    },
  ],
};

export default choices;
