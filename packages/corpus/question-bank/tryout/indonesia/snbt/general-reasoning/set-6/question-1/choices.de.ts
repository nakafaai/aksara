import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Huhn",
      value: false,
    },
    {
      label: "Rindfleisch",
      value: false,
    },
    {
      label: "Kaninchen",
      value: false,
    },
    {
      label: "Lamm",
      value: true,
    },
    {
      label: "Ente",
      value: false,
    },
  ],
};

export default choices;
