import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Everyone should take the largest possible dose of every vitamin.",
      value: false,
    },
    {
      label: "Supplements always cure an infection after symptoms begin.",
      value: false,
    },
    {
      label: "A nutrient deficiency has no effect on normal immune function.",
      value: false,
    },
    {
      label: "Vitamin and mineral supplements prevent every common cold.",
      value: false,
    },
    {
      label:
        "When nutrient intake is already adequate, taking more supplements usually does not prevent infection or speed recovery.",
      value: true,
    },
  ],
};

export default choices;
