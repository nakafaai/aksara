import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "A complete failure", value: false },
    { label: "A legal requirement", value: false },
    { label: "A historical sequence", value: false },
    { label: "A guaranteed advantage", value: false },
    { label: "A compromise between competing benefits and costs", value: true },
  ],
};

export default choices;
