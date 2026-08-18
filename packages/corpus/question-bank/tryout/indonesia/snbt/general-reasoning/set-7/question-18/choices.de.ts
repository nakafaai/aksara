import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Es verwendet eine andere Versiegelungsmethode als Gruppe A.",
      value: false,
    },
    {
      label: "Es besitzt alle Eigenschaften der Pakete aus Gruppe A.",
      value: false,
    },
    {
      label:
        "Es verwendet dieselbe Versiegelungsmethode wie die Pakete aus Gruppe A.",
      value: true,
    },
    {
      label: "Es besitzt dieselbe Seriennummer wie die Pakete aus Gruppe A.",
      value: false,
    },
    {
      label:
        "Es hat dieselben Prüfungen wie die Pakete aus Gruppe A bestanden.",
      value: false,
    },
  ],
};

export default choices;
