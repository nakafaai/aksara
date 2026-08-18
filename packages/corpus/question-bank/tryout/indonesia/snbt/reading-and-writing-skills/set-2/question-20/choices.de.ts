import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Satz $$2$$.",
      value: false,
    },
    {
      label: "Satz $$4$$.",
      value: false,
    },
    {
      label: "Satz $$6$$.",
      value: true,
    },
    {
      label: "Satz $$8$$.",
      value: false,
    },
    {
      label: "Satz $$10$$.",
      value: false,
    },
  ],
};

export default choices;
