import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Ramadan fasting guarantees permanent weight loss.",
      value: false,
    },
    {
      label:
        "The 2025 review found large permanent losses of muscle and water.",
      value: false,
    },
    {
      label:
        "Religious fasting and clinical weight treatment have the same purpose.",
      value: false,
    },
    {
      label: "The studies prove that no participant experiences any change.",
      value: false,
    },
    {
      label:
        "The studies show modest, varied, short-term average changes rather than a universal long-term result.",
      value: true,
    },
  ],
};

export default choices;
