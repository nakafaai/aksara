import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Prohibition", value: false },
    { label: "Necessity", value: true },
    { label: "Possibility", value: false },
    { label: "Permission", value: false },
    { label: "Uncertainty", value: false },
  ],
};

export default choices;
