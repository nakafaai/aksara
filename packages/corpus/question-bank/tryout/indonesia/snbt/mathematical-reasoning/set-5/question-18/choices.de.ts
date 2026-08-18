import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2:3$$",
      value: false,
    },
    {
      label: "$$4:5$$",
      value: false,
    },
    {
      label: "$$2:5$$",
      value: false,
    },
    {
      label: "$$3:4$$",
      value: true,
    },
    {
      label: "$$1:2$$",
      value: false,
    },
  ],
};

export default choices;
