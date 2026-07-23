import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "$$a > -1 + \\sqrt{3}$$",
      value: false,
    },
    {
      label: "$$a < -1 - \\sqrt{3}$$",
      value: true,
    },
    {
      label: "$$a < 1 - \\sqrt{3}$$",
      value: false,
    },
    {
      label: "$$a > 1 + \\sqrt{3}$$",
      value: false,
    },
    {
      label: "$$a < -\\sqrt{3}$$",
      value: false,
    },
  ],
  id: [
    {
      label: "$$a > -1 + \\sqrt{3}$$",
      value: false,
    },
    {
      label: "$$a < -1 - \\sqrt{3}$$",
      value: true,
    },
    {
      label: "$$a < 1 - \\sqrt{3}$$",
      value: false,
    },
    {
      label: "$$a > 1 + \\sqrt{3}$$",
      value: false,
    },
    {
      label: "$$a < -\\sqrt{3}$$",
      value: false,
    },
  ],
};

export default choices;
