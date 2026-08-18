import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$2$$ oder $$-5$$",
      value: false,
    },
    {
      label: "$$2$$ oder $$5$$",
      value: true,
    },
    {
      label: "$$4$$ oder $$-2$$",
      value: false,
    },
    {
      label: "$$-2$$ oder $$5$$",
      value: false,
    },
    {
      label: "$$-4$$ oder $$-2$$",
      value: false,
    },
  ],
};

export default choices;
