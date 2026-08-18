import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "To advertise employment opportunities at UNESCO.", value: false },
    {
      label: "To argue that culture is UNESCO's only field of work.",
      value: false,
    },
    {
      label:
        "To explain why UNESCO was created and how its mission guides its current work.",
      value: true,
    },
    {
      label: "To compare UNESCO with every other United Nations agency.",
      value: false,
    },
    {
      label: "To criticize Member States for refusing all cooperation.",
      value: false,
    },
  ],
};

export default choices;
