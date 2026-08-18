import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Vitamin C is the only nutrient involved in immune function.",
      value: false,
    },
    {
      label:
        "Sugar and vitamin C compete for physical space in white blood cells.",
      value: false,
    },
    {
      label: "One serving of fruit makes a person immune to infection.",
      value: false,
    },
    {
      label:
        "A varied, balanced diet supports adequate nutrient intake without guaranteeing immunity from illness.",
      value: true,
    },
    {
      label: "Dietary change is useful only when completed in one day.",
      value: false,
    },
  ],
};

export default choices;
