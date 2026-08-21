import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$45$$ und $$186$$ Personen",
      value: true,
    },
    {
      label: "$$45$$ und $$187$$ Personen",
      value: false,
    },
    {
      label: "$$45$$ und $$188$$ Personen",
      value: false,
    },
    {
      label: "$$46$$ und $$189$$ Personen",
      value: false,
    },
    {
      label: "$$46$$ und $$190$$ Personen",
      value: false,
    },
  ],
  en: [
    { label: "$$45$$ and $$186$$ people", value: true },
    { label: "$$45$$ and $$187$$ people", value: false },
    { label: "$$45$$ and $$188$$ people", value: false },
    { label: "$$46$$ and $$189$$ people", value: false },
    { label: "$$46$$ and $$190$$ people", value: false },
  ],
  id: [
    { label: "$$45$$ dan $$186$$ orang", value: true },
    { label: "$$45$$ dan $$187$$ orang", value: false },
    { label: "$$45$$ dan $$188$$ orang", value: false },
    { label: "$$46$$ dan $$189$$ orang", value: false },
    { label: "$$46$$ dan $$190$$ orang", value: false },
  ],
};

export default choices;
