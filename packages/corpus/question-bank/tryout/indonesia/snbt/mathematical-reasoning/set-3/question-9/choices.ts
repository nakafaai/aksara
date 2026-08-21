import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$70$$ Minuten oder $$30$$ Minuten",
      value: true,
    },
    {
      label: "$$21$$ Minuten oder $$10$$ Minuten",
      value: false,
    },
    {
      label: "$$15$$ Minuten oder $$16$$ Minuten",
      value: false,
    },
    {
      label: "$$30$$ Minuten oder $$40$$ Minuten",
      value: false,
    },
    {
      label: "$$10$$ Minuten oder $$30$$ Minuten",
      value: false,
    },
  ],
  en: [
    { label: "$$70$$ minutes or $$30$$ minutes", value: true },
    { label: "$$21$$ minutes or $$10$$ minutes", value: false },
    { label: "$$15$$ minutes or $$16$$ minutes", value: false },
    { label: "$$30$$ minutes or $$40$$ minutes", value: false },
    { label: "$$10$$ minutes or $$30$$ minutes", value: false },
  ],
  id: [
    { label: "$$70$$ menit atau $$30$$ menit", value: true },
    { label: "$$21$$ menit atau $$10$$ menit", value: false },
    { label: "$$15$$ menit atau $$16$$ menit", value: false },
    { label: "$$30$$ menit atau $$40$$ menit", value: false },
    { label: "$$10$$ menit atau $$30$$ menit", value: false },
  ],
};

export default choices;
