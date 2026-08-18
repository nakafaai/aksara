import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "the architectural history of UNESCO's offices.", value: false },
    { label: "a list of the capitals of UNESCO Member States.", value: false },
    {
      label: "a current UNESCO initiative that puts its mission into practice.",
      value: true,
    },
    { label: "an unrelated comparison of national budgets.", value: false },
    { label: "a personal biography of one UNESCO employee.", value: false },
  ],
};

export default choices;
