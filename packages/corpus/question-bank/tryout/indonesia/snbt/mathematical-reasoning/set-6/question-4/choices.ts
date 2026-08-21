import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$7$$ Monate",
      value: false,
    },
    {
      label: "$$8$$ Monate",
      value: false,
    },
    {
      label: "$$9$$ Monate",
      value: false,
    },
    {
      label: "$$10$$ Monate",
      value: true,
    },
    {
      label: "$$12$$ Monate",
      value: false,
    },
  ],
  en: [
    { label: "$$7$$ months", value: false },
    { label: "$$8$$ months", value: false },
    { label: "$$9$$ months", value: false },
    { label: "$$10$$ months", value: true },
    { label: "$$12$$ months", value: false },
  ],
  id: [
    { label: "$$7$$ bulan", value: false },
    { label: "$$8$$ bulan", value: false },
    { label: "$$9$$ bulan", value: false },
    { label: "$$10$$ bulan", value: true },
    { label: "$$12$$ bulan", value: false },
  ],
};

export default choices;
