import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$60$$ Leute",
      value: false,
    },
    {
      label: "$$48$$ Leute",
      value: false,
    },
    {
      label: "$$36$$ Leute",
      value: true,
    },
    {
      label: "$$30$$ Leute",
      value: false,
    },
    {
      label: "$$20$$ Leute",
      value: false,
    },
  ],
  en: [
    { label: "$$60$$ People", value: false },
    { label: "$$48$$ People", value: false },
    { label: "$$36$$ People", value: true },
    { label: "$$30$$ People", value: false },
    { label: "$$20$$ People", value: false },
  ],
  id: [
    { label: "$$60$$ Orang", value: false },
    { label: "$$48$$ Orang", value: false },
    { label: "$$36$$ Orang", value: true },
    { label: "$$30$$ Orang", value: false },
    { label: "$$20$$ Orang", value: false },
  ],
};

export default choices;
