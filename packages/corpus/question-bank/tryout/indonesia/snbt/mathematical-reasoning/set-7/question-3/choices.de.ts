import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Notizbücher",
      value: false,
    },
    {
      label: "Kugelschreiber",
      value: false,
    },
    {
      label: "Bleistifte",
      value: true,
    },
    {
      label: "Notizbücher und Bleistifte",
      value: false,
    },
    {
      label: "Alle bringen den gleichen Gewinn",
      value: false,
    },
  ],
};

export default choices;
