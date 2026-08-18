import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Informative", value: true },
    { label: "Nostalgic", value: false },
    { label: "Humorous", value: false },
    { label: "Hostile", value: false },
    { label: "Doubtful", value: false },
  ],
};

export default choices;
