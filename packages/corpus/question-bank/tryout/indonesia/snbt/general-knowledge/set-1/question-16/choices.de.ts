import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Tor blieb nach Sonnenuntergang *geschlossen*.",
      value: true,
    },
    {
      label: "Der Hausmeister *schloss* das Tor bei Sonnenuntergang.",
      value: false,
    },
    {
      label: "Das war der *kälteste* Morgen des Monats.",
      value: false,
    },
    {
      label: "Die Besucher *warteten* vor dem Eingang.",
      value: false,
    },
    {
      label: "Der Hinweis wurde von allen Besuchern *gelesen*.",
      value: false,
    },
  ],
};

export default choices;
