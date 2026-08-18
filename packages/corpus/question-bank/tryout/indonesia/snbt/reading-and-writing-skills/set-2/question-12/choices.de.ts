import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "vor Satz $$1$$.",
      value: false,
    },
    {
      label: "nach Satz $$1$$.",
      value: false,
    },
    {
      label: "nach Satz $$2$$.",
      value: false,
    },
    {
      label: "nach Satz $$3$$.",
      value: false,
    },
    {
      label: "nach Satz $$4$$.",
      value: true,
    },
  ],
};

export default choices;
