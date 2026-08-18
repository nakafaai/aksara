import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Evidence and trade-offs in choosing an office layout",
      value: true,
    },
    {
      label: "How to calculate the construction cost of an office",
      value: false,
    },
    { label: "Why email should replace every meeting", value: false },
    { label: "The history of corporate architecture", value: false },
    { label: "How to decorate a private office", value: false },
  ],
};

export default choices;
