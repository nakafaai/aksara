import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Mehr Verbraucher entscheiden sich für Hühnereier",
      value: false,
    },
    {
      label: "Der Preis steigt in der folgenden Woche erneut",
      value: false,
    },
    {
      label: "Mehrere Vertriebswege bleiben gestört",
      value: false,
    },
    {
      label: "Die Eierproduktion sinkt, während die Nachfrage weiter steigt",
      value: false,
    },
    {
      label:
        "Produktion und Auslieferung steigen so weit, dass die zusätzliche Nachfrage gedeckt wird",
      value: true,
    },
  ],
};

export default choices;
