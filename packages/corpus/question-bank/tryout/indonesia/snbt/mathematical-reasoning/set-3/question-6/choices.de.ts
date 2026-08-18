import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Erstes Angebot",
      value: false,
    },
    {
      label: "Zweites Angebot",
      value: true,
    },
    {
      label: "Beide Angebote sind gleichwertig",
      value: false,
    },
    {
      label: "Das erste Angebot ist doppelt so groß",
      value: false,
    },
    {
      label: "Kann nicht bestimmt werden",
      value: false,
    },
  ],
};

export default choices;
