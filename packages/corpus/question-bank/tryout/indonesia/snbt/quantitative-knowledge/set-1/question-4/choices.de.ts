import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$24 \\text{ km/h}$$",
      value: false,
    },
    {
      label: "$$48 \\text{ km/h}$$",
      value: false,
    },
    {
      label: "$$72 \\text{ km/h}$$",
      value: false,
    },
    {
      label: "$$96 \\text{ km/h}$$",
      value: false,
    },
    {
      label: "$$120 \\text{ km/h}$$",
      value: true,
    },
  ],
};

export default choices;
