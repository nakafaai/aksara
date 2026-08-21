import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$7$$ Tage",
      value: false,
    },
    {
      label: "$$8$$ Tage",
      value: false,
    },
    {
      label: "$$9$$ Tage",
      value: false,
    },
    {
      label: "$$10$$ Tage",
      value: true,
    },
    {
      label: "$$11$$ Tage",
      value: false,
    },
  ],
  en: [
    { label: "$$7$$ days", value: false },
    { label: "$$8$$ days", value: false },
    { label: "$$9$$ days", value: false },
    { label: "$$10$$ days", value: true },
    { label: "$$11$$ days", value: false },
  ],
  id: [
    { label: "$$7$$ hari", value: false },
    { label: "$$8$$ hari", value: false },
    { label: "$$9$$ hari", value: false },
    { label: "$$10$$ hari", value: true },
    { label: "$$11$$ hari", value: false },
  ],
};

export default choices;
