import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Bekräftigt Aussage A",
      value: false,
    },
    {
      label: "Schwächt Aussage A",
      value: false,
    },
    {
      label: "Bekräftigt Aussage B",
      value: false,
    },
    {
      label: "Schwächt Aussage B",
      value: false,
    },
    {
      label: "Für die Aussagen A und B irrelevant",
      value: true,
    },
  ],
};

export default choices;
