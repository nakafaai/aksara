import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Stärkt Aussage A", value: false },
    { label: "Schwächt Aussage A", value: false },
    { label: "Stärkt Aussage B", value: true },
    { label: "Schwächt Aussage B", value: false },
    { label: "Ist für beide Aussagen irrelevant", value: false },
  ],
};

export default choices;
