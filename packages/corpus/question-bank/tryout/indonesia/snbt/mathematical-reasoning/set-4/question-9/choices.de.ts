import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$5\\text{ m und }5\\text{ m}$$",
      value: true,
    },
    {
      label: "$$5\\text{ m und }6\\text{ m}$$",
      value: false,
    },
    {
      label: "$$4\\text{ m und }6\\text{ m}$$",
      value: false,
    },
    {
      label: "$$6\\text{ m und }4\\text{ m}$$",
      value: false,
    },
    {
      label: "$$8\\text{ m und }2\\text{ m}$$",
      value: false,
    },
  ],
};

export default choices;
