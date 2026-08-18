import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$85 \\text{ km/h}$$",
      value: false,
    },
    {
      label: "$$95 \\text{ km/h}$$",
      value: false,
    },
    {
      label: "$$80 \\text{ km/h}$$",
      value: false,
    },
    {
      label: "$$75 \\text{ km/h}$$",
      value: true,
    },
    {
      label: "$$90 \\text{ km/h}$$",
      value: false,
    },
  ],
};

export default choices;
